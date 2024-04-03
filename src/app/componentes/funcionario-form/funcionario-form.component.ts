import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Funcionario } from '../../models/Funcionarios';

@Component({
  selector: 'app-funcionario-form',
  standalone: true,
  imports: [ ReactiveFormsModule, FormsModule],
  templateUrl: './funcionario-form.component.html',
  styleUrl: './funcionario-form.component.scss'
})
export class FuncionarioFormComponent implements OnInit{
  @Output() onSubmit = new EventEmitter<Funcionario>();
  @Input() btnAcao!: string;
  @Input() btnTitulo!: string;
  funcionarioForm!: FormGroup;
  constructor(){
  }
  ngOnInit(): void {
      this.funcionarioForm = new FormGroup({
        id: new FormControl(0),
        nome: new FormControl('', [Validators.required]),
        sobrenome: new FormControl('', [Validators.required]),
        departamento: new FormControl('', [Validators.required]),
        turno: new FormControl('', [Validators.required]),
        ativo: new FormControl(true),
        dataDeAlteracao: new FormControl(new Date()),
        dataDeCriacao: new FormControl(new Date())
      })
  }

  submit(){
    this.onSubmit.emit(this.funcionarioForm.value);
  }
}
