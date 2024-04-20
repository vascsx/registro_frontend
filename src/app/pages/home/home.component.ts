import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from '../../services/funcionario.service';
import { CommonModule } from '@angular/common';
import { Funcionario } from '../../models/Funcionarios';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
 
  funcionarios: Funcionario[] = [];
  funcionariosGeral: Funcionario[] = [];
  constructor(private funcionarioService: FuncionarioService){ }

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
  search(event: Event){
    const searchTerm = (event.target as HTMLInputElement).value;
    this.funcionarios = this.funcionariosGeral.filter((item) => {
      return item.nome.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 || item.sobrenome.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }
}
