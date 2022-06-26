import robot from 'robotjs';
import Jimp from 'jimp';

export const screenCapture = async () => {
  const { x, y } = robot.getMousePos();
  const screenShoot = robot.screen.capture(x - 100, y - 100, 200, 200).image;
  const img = new Jimp(200, 200);
  img.bitmap.data = screenShoot;
  const base64 = await img.getBase64Async(Jimp.MIME_PNG);
  return base64.split(',')[1];
}