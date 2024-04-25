import { Request, Response } from 'express';
import User from '../models/userModel';
import { verifyNullFields, verifyRepeatFields } from '../utils/verifyFields';
import { hashPassword } from '../utils/hashPassword';

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

    const newUser = await User.create({
      complete_name_user,
      email_user,
      cpf_user,
      password_user,
      premium_user,
    });

    if (!newUser) throw new Error('Não foi possível criar o usuário!');

    res.status(200).json({ ok: true, message: 'Usuário criado com sucesso!' });
  } catch (err) {
    if (err instanceof Error)
      res.status(500).json({ ok: false, message: err.message });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    return res.json(users);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: 'Não foi possível buscar os usuários' });
  }
};
