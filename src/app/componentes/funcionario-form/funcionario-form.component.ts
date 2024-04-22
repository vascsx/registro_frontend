import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Funcionario } from '../../models/Funcionarios';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { FuncionarioService } from '../../services/funcionario.service';

@Component({
  selector: 'app-funcionario-form',
  standalone: true,
  imports: [ ReactiveFormsModule, FormsModule, RouterLink, MatIconModule, MatCardModule, MatFormField, MatLabel, MatOptionModule],
  templateUrl: './funcionario-form.component.html',
  styleUrl: './funcionario-form.component.scss'
})
export class FuncionarioFormComponent implements OnInit{
  @Output() onSubmit = new EventEmitter<Funcionario>();
  @Input() btnAcao!: string;
  @Input() btnTitulo!: string;
  @Input()  dadosFuncionario: Funcionario | null = null;

  funcionarioForm!: FormGroup;
  ativo:number = 1;


  constructor(private funcionarioService : FuncionarioService, private router: Router) {
  }


  ngOnInit(): void {

    console.log(this.dadosFuncionario?.ativo);



    this.funcionarioForm = new FormGroup ({
      id: new FormControl(this.dadosFuncionario ? this.dadosFuncionario.id : 0),
      nome: new FormControl(this.dadosFuncionario ? this.dadosFuncionario.nome : '', [Validators.required]),
      sobrenome: new FormControl(this.dadosFuncionario ? this.dadosFuncionario.sobrenome : '',[Validators.required]),
      departamento: new FormControl(this.dadosFuncionario ? this.dadosFuncionario.departamento : '',[Validators.required]),
      turno: new FormControl(this.dadosFuncionario ? this.dadosFuncionario.turno : '',[Validators.required]),
      ativo:  new FormControl(this.dadosFuncionario ? this.dadosFuncionario?.ativo : true),
      dataDeCriacao: new FormControl(new Date()),
      dataDeAlteracao: new FormControl(new Date())
    });
  }


  get nome(){
    return this.funcionarioForm.get('nome')!;
  }

  submit(){

      console.log(this.funcionarioForm.value)

      this.onSubmit.emit(this.funcionarioForm.value);
  }
}
