export interface UserType {
  nome: string;
  email: string;
  cpf: string;
  data_nascimento: string;
  telefone: string;
  cep: string;
  endereco: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  senha: string;
  confirmaSenha: string;
}

export interface UserRegisterError {
  errors: UserType | null;
  success: boolean;
}
