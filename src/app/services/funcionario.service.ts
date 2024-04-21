import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Funcionario } from '../models/Funcionarios';
import { Response } from '../models/Response';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  private apiUrl = `${environment.apiUrl}/Funcionario`
  constructor(private http: HttpClient) {}

  getFuncionarios(): Observable<Response<Funcionario[]>> {
    return this.http.get<Response<Funcionario[]>>(this.apiUrl);
  }

  createFuncionario(funcionario: Funcionario): Observable<Response<Funcionario[]>> {
    return this.http.post<Response<Funcionario[]>>(this.apiUrl, funcionario);
  }

  getFuncionario(id: number): Observable<Response<Funcionario>> {
    return this.http.get<Response<Funcionario>>(`${this.apiUrl}/${id}`)
  }

  editarFuncionario( funcionario: Funcionario): Observable<Response<Funcionario[]>> {
    return this.http.put<Response<Funcionario[]>>(`${this.apiUrl}`, funcionario);
  }


  InativaFuncionario(id: number) :Observable<Response<Funcionario[]>> {
    return this.http.put<Response<Funcionario[]>>(`${this.apiUrl}/inativaFuncionario/${id}`, id);  
}

}