import { Component } from '@angular/core';
import { FuncionarioFormComponent } from '../../componentes/funcionario-form/funcionario-form.component';
import { Funcionario } from '../../models/Funcionarios';
import { FuncionarioService } from '../../services/funcionario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [ FuncionarioFormComponent],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {
 
  btnAcao = "CADASTRAR"
  btnTitulo = "CADASTRO DE "
  constructor( private funcionarioService: FuncionarioService, private router: Router) {
    
  }
  createFuncionario(funcionario: Funcionario){
    this.funcionarioService.createFuncionario(funcionario).subscribe((data) => {  
      this.router.navigate(['/']);
    });
  }
  
}
