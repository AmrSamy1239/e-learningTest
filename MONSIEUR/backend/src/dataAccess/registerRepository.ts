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

export class registerRepositoryStore {
  async create(user: UserType): Promise<UserType[]> {
    try {
      const connection = await database.connect();
      const sql_select = `SELECT 1 FROM users WHERE email = $1`;
      const result_select = await connection.query(sql_select, [user.email]);
      const sql_insert = `INSERT INTO users(username, hash, salt, country, image, phone, degree, gender, email, dateofbirth) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`;

      if (result_select.rowCount == 0) {
        const result_insert = await connection.query(sql_insert, [
          user.username,
          user.hash,
          user.salt,
          user.country,
          user.image,
          user.phone,
          user.degree,
          user.gender,
          user.email,
          user.dateOfBirth,
        ]);
        connection.release();
        return result_insert.rows;
      } else {
        connection.release();
        return [];
      }
    } catch (error) {
      throw new Error(
        `There is an error in registerRepository create error : ${error}`
      );
    }
  }
}
