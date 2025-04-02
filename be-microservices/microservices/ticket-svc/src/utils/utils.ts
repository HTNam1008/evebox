/* Package System */
import * as QRCode from 'qrcode';
import crypto from 'crypto';

const algorithm = process.env.ENCRYPTION_ALGORITHM || 'aes-256-cbc';
const key = Buffer.from(process.env.ENCRYPTION_KEY!, 'hex');
const iv = Buffer.from(process.env.ENCRYPTION_IV!, 'hex');

export async function generateQRCode(data: string): Promise<string> {
  return await QRCode.toDataURL(data);
}

/**
 * encrypt string to ciphertext hex form.
 * @param text string to encrypt
 * @returns ciphertext dạng hex
 */
export function encrypt(text: string): string {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return encrypted;
}


/**
 * decrypt ciphertext hex form to string.
 * @param encryptedText ciphertext dạng hex
 * @returns decrypted string
 */
export function decrypt(encryptedText: string): string {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}