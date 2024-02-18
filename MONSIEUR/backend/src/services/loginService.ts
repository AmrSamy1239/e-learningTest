import { loginRepositoryStore } from "../dataAccess/loginRepository";
import { isValidPassword } from "../utils/cryptoFunction";
import { UserRouteType, UserType } from "../models/userModel";
import { verifyObj } from "../models/userModel";

const loginRepositoryStoreObj = new loginRepositoryStore();

export const loginShowService = async (
  data: verifyObj
): Promise<UserType | boolean> => {
  try {
    const gatherData = await loginRepositoryStoreObj.show(data);

    // Checking the given password if valid
    console.log(gatherData[0]);
    if (gatherData[0]) {
      const isValidPasswordResult = isValidPassword(
        data.password,
        gatherData[0].hash,
        gatherData[0].salt
      );

      if (isValidPasswordResult) return gatherData[0];
      else console.log("Email or password dosn't match!!");
    }

    return false;
  } catch (error) {
    throw new Error(`There is an error in login showService error : ${error}`);
  }
};

// passport verifyCallBack
export const verifyCallBack = async (
  username: string,
  password: string,
  done: (error: any, user?: any, options?: any) => void
) => {
  try {
    const user: verifyObj = {
      email: username,
      password: password,
    };
    const isValid = await loginShowService(user);

    if (isValid) {
      return done(null, isValid);
    } else {
      return done(null, false);
    }
  } catch (error) {
    done(error);
  }
};
