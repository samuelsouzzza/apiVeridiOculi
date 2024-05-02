import { Request, Response } from 'express';
import Users from '../models/usersModel';
import { verifyNullFields, verifyRepeatFields } from '../utils/verifyFields';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { API_KEY } from '../utils/generateAPIKey';
import { IDbUser } from '../types/types';

export const createUser = async (req: Request, res: Response) => {
  try {
    const {
      complete_name_user,
      email_user,
      cpf_user,
      password_user,
      premium_user,
    } = req.body;

    const nullFields = verifyNullFields([
      complete_name_user,
      cpf_user,
      email_user,
      password_user,
    ]);

    if (nullFields)
      throw new Error(
        `O(s) seguinte(s) campo(s) está(ão) vazios(s): ${nullFields}`
      );

    const repeatFields = await verifyRepeatFields(
      [cpf_user, email_user],
      ['cpf_user', 'email_user']
    );

    if (repeatFields)
      throw new Error(
        `O(s) seguinte(s) campo(s) já está(ão) cadastrado(s): ${repeatFields}`
      );

    const newUser = await Users.create({
      complete_name_user,
      email_user,
      cpf_user,
      password_user,
      premium_user,
    });

    if (!newUser) throw new Error('Não foi possível criar o usuário!');

    return res
      .status(200)
      .json({ ok: true, message: 'Usuário criado com sucesso!' });
  } catch (err) {
    if (err instanceof Error)
      return res.status(500).json({ ok: false, message: err.message });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await Users.findAll();
    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'Não foi possível buscar os usuários.' });
  }
};

export const authUser = async (req: Request, res: Response) => {
  try {
    const { email_user, password_user } = req.body;

    const foundUser = await Users.findOne({
      where: { email_user: email_user },
    });
    if (!foundUser) throw new Error('Usuário não encontrado');

    const dbUser: IDbUser = foundUser.get();

    const passwordCompare = await bcrypt.compare(
      password_user,
      dbUser.password_user
    );
    if (!passwordCompare) throw new Error('A senha está incorreta!');

    const token = jwt.sign({ id_user: dbUser.id_user }, API_KEY, {
      expiresIn: '1d',
    });

    return res.status(200).json({
      ok: true,
      message: 'Encontramos o perfil',
      userLogged: {
        complete_name_user: dbUser.complete_name_user,
        premium_user: 0,
      },
      token,
    });
  } catch (err) {
    if (err instanceof Error)
      return res.status(500).json({ ok: false, message: err.message });
  }
};
