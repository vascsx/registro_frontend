import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FuncionarioService } from '../../services/funcionario.service';
import { Funcionario } from '../../models/Funcionarios';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalhes',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './detalhes.component.html',
  styleUrl: './detalhes.component.scss'
})
export class DetalhesComponent implements OnInit {
  funcionario? :Funcionario;
  id!: number;
  constructor(private router: Router, private funcionarioService: FuncionarioService, private route:ActivatedRoute){}

  ngOnInit(): void {
      this.id = Number(this.route.snapshot.paramMap.get('id'));
      this.funcionarioService.getFuncionario(this.id).subscribe((data) => {

        const dados = data.dados;
        dados.dataDeCriacao = new Date(dados.dataDeCriacao!).toLocaleDateString('pt-BR');
        dados.dataDeAlteracao = new Date(dados.dataDeAlteracao!).toLocaleDateString('pt-BR');
        this.funcionario = data.dados;
      })
  }

  InativaFuncionario(){
    this.funcionarioService.InativaFuncionario(this.id).subscribe((data) => {
      console.log("error");
      this.router.navigate(['']);
      console.log("deu");
    })
  }
}
