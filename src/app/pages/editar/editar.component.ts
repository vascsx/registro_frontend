import { Component, OnInit } from '@angular/core';
import { FuncionarioFormComponent } from '../../componentes/funcionario-form/funcionario-form.component';
import { Funcionario } from '../../models/Funcionarios';
import { FuncionarioService } from '../../services/funcionario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [FuncionarioFormComponent, CommonModule],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.scss'
})
export class EditarComponent implements OnInit{
  btnAcao: string = 'Editar'
  btnTitulo: string = 'Editar funcionario';

  funcionario!: Funcionario;

  constructor(private funcionarioService: FuncionarioService, private route: ActivatedRoute, private router: Router){

  }
  ngOnInit(): void {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.funcionarioService.getFuncionario(id).subscribe(data => {
        this.funcionario = data.dados;

      });
  }

  editarFuncionario(funcionario: Funcionario) {
    this.funcionarioService.editarFuncionario(funcionario).subscribe(data => {
      this.router.navigate(['/']);
    });
  }
}
