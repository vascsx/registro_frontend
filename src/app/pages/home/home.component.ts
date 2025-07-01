import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from '../../services/funcionario.service';
import { Funcionario } from '../../models/Funcionarios';
import { ExcluirComponent } from '../../componentes/excluir/excluir.component';
import { DetalhesComponent } from '../detalhes/detalhes.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule, MatDialog } from '@angular/material/dialog'; // Importe MatDialog e MatDialogModule
import { RouterLink } from '@angular/router';
import { DepartamentoService, DepartamentoModel, CargoService, CargoModel, ProjetoService, ProjetoModel } from '../../services/departamento.service';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
    CommonModule,
    ExcluirComponent,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  columnsToDisplay = ['Situacao', 'Nome', 'Sobrenome', 'Departamento', 'Cargo', 'Projeto', 'Ações'];
  funcionarios: Funcionario[] = [];
  funcionariosGeral: Funcionario[] = [];
  departamentos: DepartamentoModel[] = [];
  cargos: CargoModel[] = [];
  projetos: ProjetoModel[] = [];

  constructor(
    private funcionarioService: FuncionarioService,
    private matDialog: MatDialog,
    private departamentoService: DepartamentoService,
    private cargoService: CargoService,
    private projetoService: ProjetoService
  ) {} 

  ngOnInit(): void {
    this.funcionarioService.getFuncionarios().subscribe(data => {
      this.funcionarios = data.dados.map(item => {
        item.dataDeCriacao = new Date(item.dataDeCriacao!).toLocaleDateString('pt-BR');
        item.dataDeAlteracao = new Date(item.dataDeAlteracao!).toLocaleDateString('pt-BR');
        return item;
      });
      this.funcionariosGeral = [...this.funcionarios];
    });
    this.departamentoService.getDepartamentos().subscribe(res => {
      this.departamentos = res.dados;
    });
    this.cargoService.getCargos().subscribe(res => {
      this.cargos = res.dados;
    });
    this.projetoService.getProjetos().subscribe(res => {
      this.projetos = res.dados;
    });
  }

  search(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.funcionarios = this.funcionariosGeral.filter(
      item =>
        item.nome.toLowerCase().includes(searchTerm) ||
        item.sobrenome.toLowerCase().includes(searchTerm)
    );
  }

  openDialog(id: number): void {
    this.matDialog.open(ExcluirComponent, {
      width: '350px',
      height: '350px',
      data: {
        id: id
      }
    });
  }

  openDetalhesDialog(id: number): void {
    this.matDialog.open(DetalhesComponent, {
      width: '600px',
      data: { id }
    });
  }

  getDepartamentoNome(id: number | string | undefined): string {
    if (id === undefined || id === null) return '';
    const dep = this.departamentos.find(d => d.id == id);
    return dep ? dep.nome : id?.toString();
  }

  getCargoNome(id: number | string | undefined): string {
    if (id === undefined || id === null) return '';
    const cargo = this.cargos.find(c => c.id == id);
    return cargo ? cargo.nome : id?.toString();
  }

  getProjetoNome(id: number | string | undefined): string {
    if (id === undefined || id === null) return '';
    const proj = this.projetos.find(p => p.id == id);
    return proj ? proj.nome : id?.toString();
  }
}
