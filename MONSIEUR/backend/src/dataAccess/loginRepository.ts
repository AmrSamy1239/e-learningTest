import database from "../config/databaseConfig";
import { UserType, UserRouteType, verifyObj } from "../models/userModel";

export class loginRepositoryStore {
  async show(user: verifyObj): Promise<UserType[]> {
    try {
      const connection = await database.connect();
      const sql_select = `SELECT * FROM users WHERE email = $1`;
      const result_select = await connection.query(sql_select, [user.email]);

      // console.log(result_select.rows);

      connection.release();

      // Checking if the user dosn't exist
      if (result_select.rowCount === 0) return [];

      return result_select.rows;
    } catch (error) {
      throw new Error(
        `There is an error in loginRepository show error : ${error}`
      );
    }
  }

  async showId(id: string): Promise<UserType[]> {
    try {
      const connect = await database.connect();
      const sql = `SELECT * FROM users WHERE id = $1`;
      const result = await connect.query(sql, [id]);
      if (result.rowCount === 0) return [];
      console.log(result.rows);
      connect.release();
      return result.rows;
    } catch (error) {
      throw new Error(`there an error in showId query error: ${error}`);
    }
  }
}
