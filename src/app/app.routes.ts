import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { EditarComponent } from './pages/editar/editar.component';
import { LoginComponent } from './pages/login/login.component';
import { DetalhesComponent } from './pages/detalhes/detalhes.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    }, //TELA PRINCIPAL
     
    {
        path: 'cadastro',
        component: CadastroComponent,
    }, //TELA DE CADASTRO

    {
        path: 'editar/:id',
        component: EditarComponent
    }, //TELA DE EDIÇÃO

    {
        path: 'detalhes/:id',
        component: DetalhesComponent
    } //TELA DE DETALHES
    
    // {
    //     path: 'login',
    //     component: LoginComponent
    // }
];
