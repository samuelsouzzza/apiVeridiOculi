import { Request, Response } from 'express';
import User from '../models/userModel';

export const createUser = async (req: Request, res: Response) => {
  try {
    const {
      complete_name_user,
      email_user,
      cpf_user,
      password_user,
      premium_user,
    } = req.body;

    if (!complete_name_user || !email_user || !cpf_user || !password_user)
      throw new Error(
        `O(s) campo(s) ${!complete_name_user ? '"Nome completo"' : ''} ${
          !email_user ? '"E-Mail"' : ''
        } ${!cpf_user ? '"CPF"' : ''} ${
          !password_user ? '"Senha"/"Confirmar senha"' : ''
        } não pode(m) estar vazio(s).`
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
