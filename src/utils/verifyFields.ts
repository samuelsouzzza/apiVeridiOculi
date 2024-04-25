import User from '../models/userModel';

const databaseFiels = [
  'complete_name_user',
  'cpf_user',
  'email_user',
  'password_user',
  'confirm_password_user',
  'premium_user',
];

function replaceField(fieldnames: string) {
  switch (fieldnames) {
    case 'complete_name_user':
      return 'Nome completo';
    case 'cpf_user':
      return 'CPF';
    case 'email_user':
      return 'E-Mail';
    case 'password_user':
      return 'Nova senha';
    case 'confirm_password_user':
      return 'Confirmar senha';
  }
}

export const verifyNullFields = (fieldnames: string[]) => {
  const nulls = fieldnames
    .map((field, i) => {
      if (!field) return replaceField(databaseFiels[i]);
      return;
    })
    .filter((field) => field);

  if (nulls.length > 0) {
    if (nulls.length === 1) {
      return nulls[0];
    } else if (nulls.length === 2) {
      return nulls.join(' e ');
    } else {
      return nulls.slice(0, -1).join(', ') + ' e ' + nulls[nulls.length - 1];
    }
  }
};

export const verifyRepeatFields = async (
  values: string[],
  fieldnames: string[]
) => {
  const results = [];

  for (const value of values) {
    const found = await User.findOne({
      where: { [fieldnames[values.indexOf(value)]]: value },
    });
    if (found) {
      results.push(replaceField(fieldnames[values.indexOf(value)]));
    }
  }

  if (results.length > 0) {
    if (results.length === 1) {
      return results[0];
    } else if (results.length === 2) {
      return results.join(' e ');
    } else {
      return (
        results.slice(0, -1).join(', ') + ' e ' + results[results.length - 1]
      );
    }
  }

  return null;
};
