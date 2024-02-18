export type UserType = {
  username: string;
  password?: string;
  hash: string;
  salt: string;
  country: string;
  image: string;
  phone: string;
  degree: string;
  gender: string;
  email: string;
  dateOfBirth: Date;
};

export type UserRouteType = {
  id?: string;
  username: string;
  password: string;
  country: string;
  image: string;
  phone: string;
  degree: string;
  gender: string;
  email: string;
  dateOfBirth: Date;
};

export type verifyObj = {
  email: string;
  password: string;
};
