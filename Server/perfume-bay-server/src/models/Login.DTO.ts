export type LOGIN = {
  email: string;
  password: string;
};

export type TOKEN = {
  success: boolean;
  access_token: string;
};
