import { Component, OnInit } from '@angular/core';
import { FuncionarioFormComponent } from '../../componentes/funcionario-form/funcionario-form.component';
import { Funcionario } from '../../models/Funcionarios';
import { FuncionarioService } from '../../services/funcionario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [FuncionarioFormComponent, CommonModule, MatButtonModule],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.scss'
})
export class EditarComponent implements OnInit{
  btnAcao = "EDITAR";
  btnTitulo = "EDITAR";
  funcionario!: Funcionario;

  constructor(private funcionarioService : FuncionarioService, private router :Router,  private route : ActivatedRoute) {


  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.funcionarioService.getFuncionario(id).subscribe((data) => {
        this.funcionario = data.dados;

    });
  }

  async editFuncionario(funcionario : Funcionario){

      this.funcionarioService.editarFuncionario(funcionario).subscribe(data => {
        this.router.navigate(['/']);
      });

  }

}
