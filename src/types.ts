export type UserProfile = {
  bio?: string;
  user_name: string;
  picture: string;
  handle: string;
};

export type Chirp = {
  body: string;
  created_at: string;
};

export type ChirpWithAuthor = Chirp & {
  author: UserProfile;
};
