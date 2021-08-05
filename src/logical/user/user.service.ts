import { Injectable } from '@nestjs/common';
import * as Sequelize from 'sequelize';
import sequelize from '../../../database/sequelize';
import { makeSalt, encryptPassword } from '../../utils/cryptogram';
@Injectable()
export class UserService {
  async findOne(username: string): Promise<any> {
    const sql = `
        SELECT user_id id,account_name username,passwd password,passwd_salt salt,mobile,real_name realName,role FROM admin_user WHERE account_name='${username}'
     `;

    try {
      const user = (
        await sequelize.query(sql, {
          type: Sequelize.QueryTypes.SELECT,
          raw: true,
          logging: true,
        })
      )[0];
      return user;
    } catch (error) {
      console.error(error);
      return void 0;
    }
  }

  //   async findExistUser(username: string, password: string): Promise<any> {
  //     const sql = `
  //       SELECT user_id id,account_name username,passwd password,passwd_salt salt,mobile,real_name realName,role FROM admin_user WHERE account_name='${username}' AND passwd='${password}'
  //    `;
  //     try {
  //       const user = (
  //         await sequelize.query(sql, {
  //           type: Sequelize.QueryTypes.SELECT,
  //           raw: true,
  //           logging: true,
  //         })
  //       )[0];
  //       return user;
  //     } catch (error) {
  //       console.error(error);
  //       return void 0;
  //     }
  //   }
  /**
   * 注册
   * @param requestBody
   */
  async register(requestBody: any): Promise<any> {
    const { accountName, realName, password, repassword, mobile } = requestBody;
    if (password !== repassword) {
      return {
        code: 400,
        msg: '两次密码输入不一致',
      };
    }
    const user = await this.findOne(accountName);

    if (user) {
      return {
        code: 400,
        msg: '用户已存在',
      };
    }
    const salt = makeSalt();
    const hashPwd = encryptPassword(password, salt);
    const registerSQL = `
        INSERT INTO admin_user
            (account_name, real_name, passwd, passwd_salt, mobile, user_status, role, create_by)
        VALUES
            ('${accountName}', '${realName}', '${hashPwd}', '${salt}', '${mobile}', 1, 3, 0)
    `;
    try {
      await sequelize.query(registerSQL, { logging: true });
      return {
        code: 200,
        msg: 'Success',
      };
    } catch (error) {
      return {
        code: 503,
        msg: `Service error:${error}`,
      };
    }
  }
}
