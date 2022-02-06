type MaybeString = string | null;

export type UserProfile = {
  bio: MaybeString;
  handle: string;
  user_name: string;
  picture: MaybeString;
};

export type Chirp = {
  id: number;
  body: string;
  created_at: string;
};

export type ChirpWithAuthor = Chirp & {
  author: UserProfile;
};
