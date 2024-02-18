import crypto from "crypto";

type hashObj = {
  salt: string;
  hash: string;
};

// Hashing the user password
export const genHashFunction = (passoword: string): hashObj => {
  try {
    const salt: string = crypto.randomBytes(32).toString("hex");
    const hash: string = crypto
      .pbkdf2Sync(passoword, salt, 1000, 64, "sha512")
      .toString("hex");
    return {
      salt,
      hash,
    };
  } catch (error) {
    throw new Error(`there is an error in genHashFunction error: ${error}`);
  }
};

// Checking if the password same as the hashed password
export const isValidPassword = (
  password: string,
  hash: string,
  salt: string
): boolean => {
  try {
    const hashVerify: string = crypto
      .pbkdf2Sync(password, salt, 1000, 64, "sha512")
      .toString("hex");
    return hash == hashVerify;
  } catch (error) {
    throw new Error(`there is an error in isValidPassword error: ${error}`);
  }
};
