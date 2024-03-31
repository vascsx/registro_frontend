import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from '../../services/funcionario.service';
import { CommonModule } from '@angular/common';
import { Funcionario } from '../../models/Funcionarios';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
 
  funcionarios: Funcionario[] = [];
  funcionariosGeral: Funcionario[] = [];
  constructor(private funcionarioService: FuncionarioService){}

  ngOnInit(): void {
     this.funcionarioService.getFuncionarios().subscribe(data => {
      const dados = data.dados;
      dados.map((item) => {
        item.dataDeCriacao = new Date(item.dataDeCriacao!).toLocaleDateString("pt-BR");
        item.dataDeAlteracao = new Date(item.dataDeAlteracao!).toLocaleDateString("pt-BR");
      })

      this.funcionarios = data.dados;
      this.funcionariosGeral = data.dados;
    });
  }
}
