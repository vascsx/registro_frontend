import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FuncionarioService } from '../../services/funcionario.service';
import { Funcionario } from '../../models/Funcionarios';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-detalhes',
  standalone: true,
  imports: [RouterLink, CommonModule, MatCardModule, MatLabel, MatOptionModule, MatFormField, MatButtonModule],
  templateUrl: './detalhes.component.html',
  styleUrl: './detalhes.component.scss'
})
export class DetalhesComponent implements OnInit {
  
  funcionario?: Funcionario;
  id!:number;

 constructor(private funcionarioService: FuncionarioService, private route: ActivatedRoute, private router : Router) {

 }

 ngOnInit(): void {

     this.id =  Number(this.route.snapshot.paramMap.get("id"));

     this.funcionarioService.getFuncionario( this.id).subscribe((data) => {
        const dados = data.dados;
        dados.dataDeCriacao = new Date(dados.dataDeCriacao!).toLocaleDateString("pt-BR");
        dados.dataDeAlteracao = new Date(dados.dataDeAlteracao!).toLocaleDateString("pt-BR");

        this.funcionario = dados;
     });
 }


 InativaFuncionario(){

     this.funcionarioService.InativaFuncionario(this.id).subscribe((data) => {
       this.router.navigate(['']);
       }
     );
    }

    getSituacaoEmMaiusculas(): string {
      return this.funcionario?.ativo ? 'Ativo' : 'Inativo';
    }
}
