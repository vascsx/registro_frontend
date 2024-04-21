import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from '../../services/funcionario.service';
import { Funcionario } from '../../models/Funcionarios';
import { ExcluirComponent } from '../../componentes/excluir/excluir.component';
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
  columnsToDisplay = ['Situacao', 'Nome', 'Sobrenome', 'Departamento', 'Ações'];
  funcionarios: Funcionario[] = [];
  funcionariosGeral: Funcionario[] = [];

  constructor(private funcionarioService: FuncionarioService, private matDialog: MatDialog) {} // Injete MatDialog no construtor

  ngOnInit(): void {
    this.funcionarioService.getFuncionarios().subscribe(data => {
      this.funcionarios = data.dados.map(item => {
        item.dataDeCriacao = new Date(item.dataDeCriacao!).toLocaleDateString('pt-BR');
        item.dataDeAlteracao = new Date(item.dataDeAlteracao!).toLocaleDateString('pt-BR');
        return item;
      });
      this.funcionariosGeral = [...this.funcionarios];
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
}
