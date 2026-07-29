import { upload } from '@imagekit/javascript';
import api from '../lib/axios';

const getAuthParams = async () => {
  const response = await api.get('/api/upload/auth');
  const { signature, expire, token } = response.data.data;
  return { signature, expire, token };
};

export const uploadImage = async (file: File): Promise<string> => {
  const authParams = await getAuthParams();

  const result = await upload({
    file,
    fileName: file.name,
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || '',
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || '',
    ...authParams,
  } as any);

  return (result as any).url || '';
};
