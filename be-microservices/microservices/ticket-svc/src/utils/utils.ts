/* Package System */
import * as QRCode from 'qrcode';

export async function generateQRCode(data: string): Promise<string> {
  return await QRCode.toDataURL(data);
}