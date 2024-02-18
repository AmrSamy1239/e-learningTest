import database from "../config/databaseConfig";
import { UserType } from "../models/userModel";

//   username: string;
//   password: string;
//   country: string;
//   image: string;
//   phone: string;
//   degree: string;
//   gender: string;
//   email: string;
//   dateofbirth: Date;

export class loginRepositoryStore {
  async showProfile(userId: number): Promise<UserType[]> {
    try {
      const connection = await database.connect();
      const sql_select = `SELECT username, country, image, phone, degree, gender, email, dateofbirth FROM users WHERE id = $1`;
      const result_select = await connection.query(sql_select, [userId]);

      // console.log(result_select.rows);

      connection.release();

      // Checking if the user dosn't exist
      if (result_select.rowCount === 0) return [];

      return result_select.rows;
    } catch (error) {
      throw new Error(
        `There is an error in profileRepository show error : ${error}`
      );
    }
  }
}
