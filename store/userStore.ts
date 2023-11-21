import { create } from 'zustand';

import { UserType } from '../types';

type UserStore = {
  user: UserType;
  add: (user: UserType) => void;
  delete: (user: UserType) => void;
  update: (user: UserType) => void;
};

export const useUserStore = create<UserStore>()((set) => {
  return {
    user: {
      name: '',
      password: '',
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
    add: (user: UserType) => set((state) => ({ ...state.user, user })),
    delete: (user: UserType) => set((state) => ({ ...state.user, user })),
    update: (user: UserType) => set((state) => ({ ...state.user, user }))
  };
});
