export interface Funcionario {
    id?: number;
    nome: string;
    sobrenome: string;
    departamentoId: string;
    ativo: boolean;
    turno: string;
    dataDeCriacao?: string;
    dataDeAlteracao?: string;
    cargoId?: string;
    projetoId?: string;
}