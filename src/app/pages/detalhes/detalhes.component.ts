import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FuncionarioService } from '../../services/funcionario.service';
import { Funcionario } from '../../models/Funcionarios';

@Component({
  selector: 'app-detalhes',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './detalhes.component.html',
  styleUrl: './detalhes.component.scss'
})
export class DetalhesComponent {

  funcionario? : Funcionario;

  constructor(private funcionarioService: FuncionarioService, private route: ActivatedRoute, private router: Router){}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.funcionarioService.getFuncionario(id).subscribe(data => {
      this.funcionario = data.dados;
    });
  }
  }