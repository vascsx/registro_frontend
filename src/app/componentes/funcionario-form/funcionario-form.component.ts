import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Funcionario } from '../../models/Funcionarios';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-funcionario-form',
  standalone: true,
  imports: [ ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './funcionario-form.component.html',
  styleUrl: './funcionario-form.component.scss'
})
export class FuncionarioFormComponent implements OnInit{
  @Output() onSubmit = new EventEmitter<Funcionario>();
  @Input() btnAcao!: string;
  @Input() btnTitulo!: string;
  @Input() dadosFuncionario: Funcionario | null = null;
  funcionarioForm!: FormGroup;
  constructor(){
  }
  ngOnInit(): void {
      this.funcionarioForm = new FormGroup({
        id: new FormControl(this.dadosFuncionario ? this.dadosFuncionario.id : 0),
        nome: new FormControl(this.dadosFuncionario ? this.dadosFuncionario.nome : '', [Validators.required]),
        sobrenome: new FormControl(this.dadosFuncionario ? this.dadosFuncionario.sobrenome :'', [Validators.required]),
        departamento: new FormControl(this.dadosFuncionario ? this.dadosFuncionario.departamento :'', [Validators.required]),
        turno: new FormControl(this.dadosFuncionario ? this.dadosFuncionario.turno :'', [Validators.required]),
        ativo: new FormControl(this.dadosFuncionario ? this.dadosFuncionario.ativo : true),
        dataDeAlteracao: new FormControl(new Date()),
        dataDeCriacao: new FormControl(new Date())
      })
  }

  submit(){
    this.onSubmit.emit(this.funcionarioForm.value);
  }
}
