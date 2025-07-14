import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FuncionarioService } from '../../services/funcionario.service';
import { Funcionario } from '../../models/Funcionarios';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { DepartamentoService, DepartamentoModel, CargoService, CargoModel, ProjetoService, ProjetoModel } from '../../services/departamento.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-detalhes',
  standalone: true,
  imports: [RouterLink, CommonModule, MatCardModule, MatLabel, MatOptionModule, MatFormField, MatButtonModule],
  templateUrl: './detalhes.component.html',
  styleUrl: './detalhes.component.scss'
})
export class DetalhesComponent implements OnInit {
  funcionario?: Funcionario;
  id!: number;
  departamentos: DepartamentoModel[] = [];
  cargos: CargoModel[] = [];
  projetos: ProjetoModel[] = [];

  constructor(
    private funcionarioService: FuncionarioService,
    private route: ActivatedRoute,
    private router: Router,
    private departamentoService: DepartamentoService,
    private cargoService: CargoService,
    private projetoService: ProjetoService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DetalhesComponent>,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.id = this.data?.id ?? Number(this.route.snapshot.paramMap.get("id"));

    this.funcionarioService.getFuncionario(this.id).subscribe((data) => {
      const dados = data.dados;
      dados.dataDeCriacao = new Date(dados.dataDeCriacao!).toLocaleDateString("pt-BR");
      dados.dataDeAlteracao = new Date(dados.dataDeAlteracao!).toLocaleDateString("pt-BR");
      this.funcionario = dados;
    });

    this.departamentoService.getDepartamentos().subscribe(res => {
      this.departamentos = res.dados;
    });
    this.cargoService.getCargos().subscribe(res => {
      this.cargos = res.dados;
    });
    this.projetoService.getProjetos().subscribe(res => {
      this.projetos = res.dados;
    });
  }

  InativaFuncionario() {
    this.funcionarioService.InativaFuncionario(this.id).subscribe({
      next: () => {
        this.snackBar.open('Funcionário inativado com sucesso!', 'Fechar', {
          duration: 3000,
          verticalPosition: 'top'
        });
        setTimeout(() => {
          if (this.dialogRef) {
            this.dialogRef.close(true);
            window.location.reload();
          } else {
            this.router.navigate(['']);
          }
        }, 3000); // Aguarda a mensagem sumir antes de fechar/recarregar
      },
      error: () => {
        this.snackBar.open('Não foi possível inativar o funcionário.', 'Fechar', {
          duration: 3000,
          verticalPosition: 'top'
        });
      }
    });
  }

  voltar() {
    if (this.dialogRef) {
      this.dialogRef.close();
    } else {
      this.router.navigate(['']);
    }
  }

  getSituacaoEmMaiusculas(): string {
    return this.funcionario?.ativo ? 'Ativo' : 'Inativo';
  }

  getDepartamentoNome(id: number | string | undefined): string {
    if (id === undefined || id === null) return '';
    const dep = this.departamentos.find(d => d.id == id);
    return dep ? dep.nome : id.toString();
  }

  getCargoNome(id: number | string | undefined): string {
    if (id === undefined || id === null) return '';
    const cargo = this.cargos.find(c => c.id == id);
    return cargo ? cargo.nome : id.toString();
  }

  getProjetoNome(id: number | string | undefined): string {
    if (id === undefined || id === null) return '';
    const proj = this.projetos.find(p => p.id == id);
    return proj ? proj.nome : id.toString();
  }
}
