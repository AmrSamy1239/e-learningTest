import { registerRepositoryStore } from "../dataAccess/registerRepository";
import { genHashFunction } from "../utils/cryptoFunction";
import { UserRouteType, UserType } from "../models/userModel";

const registerRepositoryStoreObj = new registerRepositoryStore();

// Register services hashing password and pass it with user obj to registerRepositoryStoreObj create
export const registerCreateService = async (
  data: UserRouteType
): Promise<UserType[]> => {
  try {
    const passwordHashObj = genHashFunction(data.password);
    const postData = await registerRepositoryStoreObj.create({
      ...data,
      hash: passwordHashObj.hash,
      salt: passwordHashObj.salt,
    });
    if (postData.length === 0) {
      console.log("User email alreadt exist!!");
    } else {
      console.log("User Registered!!");
    }
    return postData;
  } catch (error) {
    throw new Error(
      `There is an error in register createService error : ${error}`
    );
  }
};
