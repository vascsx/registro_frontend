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

  // getFuncionario(id: number): Observable<Response<Funcionario>> {
  //   return this.http.get<Response<Funcionario>>(`${this.apiUrl}/${id}`);
  // }
  // getDepartamentos(): Observable<Response<string[]>> {
  //   return this.http.get<Response<string[]>>(`${this.apiUrl}/departamento`);
  // }

  // getTurnos(): Observable<Response<string[]>> {
  //   return this.http.get<Response<string[]>>(`${this.apiUrl}/turno`);
  // }

  // getAtivos(): Observable<Response<string[]>> {
  //   return this.http.get<Response<string[]>>(`${this.apiUrl}/ativo`);
  // }

  // postFuncionario(funcionario: Funcionario): Observable<Response<Funcionario>> {
  //   return this.http.post<Response<Funcionario>>(this.apiUrl, funcionario);
  // }

  // putFuncionario(funcionario: Funcionario): Observable<Response<Funcionario>> {
  //   return this.http.put<Response<Funcionario>>(`${this.apiUrl}/${funcionario.id}`, funcionario);
  // }

  // deleteFuncionario(id: number): Observable<Response<Funcionario>> {
  //   return this.http.delete<Response<Funcionario>>(`${this.apiUrl}/${id}`);
  // }




  



}
