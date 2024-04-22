import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Funcionario } from '../../models/Funcionarios';
import { FuncionarioService } from '../../services/funcionario.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-excluir',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './excluir.component.html',
  styleUrl: './excluir.component.scss'
})
export class ExcluirComponent implements OnInit{

  inputdata:any
  funcionario!: Funcionario;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private funcionarioService: FuncionarioService, private router: Router, private ref:MatDialogRef<ExcluirComponent>){}

  ngOnInit(): void {
      this.inputdata = this.data;

      this.funcionarioService.getFuncionario(this.inputdata.id).subscribe(data => {
          this.funcionario = data.dados;
      });
  }

  excluir(){
    this.funcionarioService.ExcluirFuncionario(this.inputdata.id).subscribe(data => {
       this.ref.close();
       window.location.reload();
    });
  }

}

