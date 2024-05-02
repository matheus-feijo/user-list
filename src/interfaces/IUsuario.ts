import { TipoUsuario } from "../@types/TipoUsuario";

export interface IUsuario {
  id: number;
  nome: string;
  sobrenome: string;
  tipoUsuario: TipoUsuario;
  email: string;
  senha: string;
  ativo: boolean;
}
