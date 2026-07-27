export interface IUser {
  _id: string;
  googleId: string;
  name: string;
  email: string;
  profilePicture: string;
  themePreference: 'light' | 'dark' | 'system';
  portfolioRef?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAuthPayload {
  userId: string;
  email: string;
  name: string;
}
