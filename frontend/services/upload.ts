import ImageKit from '@imagekit/javascript';
import api from '../lib/axios';

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || '',
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || '',
  authenticator: async () => {
    try {
      const response = await api.get('/api/upload/auth');
      const { signature, expire, token } = response.data.data;
      return { signature, expire, token };
    } catch (error) {
      throw new Error(`Authentication request failed: ${error}`);
    }
  },
});

export const uploadImage = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    imagekit.upload(
      {
        file,
        fileName: file.name,
      },
      (err, result) => {
        if (err) {
          reject(err);
        } else if (result) {
          resolve(result.url);
        }
      }
    );
  });
};
