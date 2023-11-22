import { create } from 'zustand';

import { UserType } from '../types';

type UserStore = {
  user: UserType;
  add: (user: UserType) => void;
};

export const userErrorRegisterStore = create<UserStore>()((set) => {
  return {
    user: {
      nome: '',
      email: '',
      cpf: '',
      data_nascimento: '',
      telefone: '',
      cep: '',
      estado: '',
      endereco: '',
      bairro: '',
      numero: '',
      cidade: '',
      confirmaSenha: '',
      senha: ''
    },
    add: (user: UserType) => set((state) => ({ ...state.user, user }))
  };
});
