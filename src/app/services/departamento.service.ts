import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

export interface DepartamentoModel {
  id: number;
  nome: string;
}

export interface EmpresaModel {
  id: number;
  nome: string;
}

export interface CargoModel {
  id: number;
  nome: string;
}

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
  private apiUrl = `${environment.apiUrl}/Departamento`;

  constructor(private http: HttpClient) {}

  getDepartamentos(): Observable<{ dados: DepartamentoModel[] }> {
    return this.http.get<{ dados: DepartamentoModel[] }>(this.apiUrl);
  }
}

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private apiUrl = `${environment.apiUrl}/Empresa`;

  constructor(private http: HttpClient) {}

  getEmpresas(): Observable<{ dados: EmpresaModel[] }> {
    return this.http.get<{ dados: EmpresaModel[] }>(this.apiUrl);
  }
}

@Injectable({
  providedIn: 'root'
})
export class CargoService {
  private apiUrl = `${environment.apiUrl}/Cargo`;

  constructor(private http: HttpClient) {}

  getCargos(): Observable<{ dados: CargoModel[] }> {
    return this.http.get<{ dados: CargoModel[] }>(this.apiUrl);
  }
}