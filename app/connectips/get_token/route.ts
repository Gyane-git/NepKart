import { NextResponse } from 'next/server';
import crypto from 'crypto';
import NodeRSA from 'node-rsa';
import pem, { type Pkcs12ReadResult } from 'pem';
import { objectToKeyValueString } from '@/utils/payments/objectToKeyValueString';

// ✅ Read sensitive data securely from environment
const PASS = process.env.CONNECTIPS_CREDITOR_PASSWORD;
const PFX_BASE64 = process.env.CONNECTIPS_CREDITOR_PFX_BASE64;

// ✅ Convert the Base64 certificate to Buffer (instead of using fs)
const getPfxBuffer = (): Buffer => {
  if (!PFX_BASE64) {
    throw new Error('Environment variable CONNECTIPS_CREDITOR_PFX_BASE64 is missing');
  }
  return Buffer.from(PFX_BASE64, 'base64');
};

// ✅ Extract private key from PFX buffer
const getPrivateKey = async (): Promise<Pkcs12ReadResult['key']> => {
  return new Promise((resolve, reject) => {
    pem.readPkcs12(getPfxBuffer(), { p12Password: PASS }, (err, cert) => {
      if (cert?.key) {
        resolve(cert.key);
      } else {
        reject(err || new Error('Unable to read private key from PFX'));
      }
    });
  });
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message = objectToKeyValueString(body);

    // ✅ Generate RSA private key
    const key = new NodeRSA(await getPrivateKey()).exportKey('pkcs8');

    // ✅ Sign the message
    const signer = crypto.createSign('SHA256');
    signer.update(message);
    const signature = signer.sign(key, 'base64');

    return NextResponse.json({ TOKEN: signature });
  } catch (error: any) {
    console.error('Error generating signature:', error);
    return NextResponse.json({ error: 'Failed to generate token' }, { status: 500 });
  }
}
