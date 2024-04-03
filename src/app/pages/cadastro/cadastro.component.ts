import { Component } from '@angular/core';
import { FuncionarioFormComponent } from '../../componentes/funcionario-form/funcionario-form.component';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [ FuncionarioFormComponent],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {
  
  
}
