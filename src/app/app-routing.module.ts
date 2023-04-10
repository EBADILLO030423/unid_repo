import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'Login',
    pathMatch: 'full'
  },
  {
    path: 'Login',
    loadChildren: () => import('./Paginas/folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'Registro de Horarios/:ID',
    loadChildren: () => import('./Paginas/clases/clases.module').then( m => m.ClasesPageModule)
  },
  {
    path: 'Registro Entradas y Salidas/:ID',
    loadChildren: () => import('./Paginas/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./Paginas/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'Evaluacion de Horas/:ID',
    loadChildren: () => import('./Paginas/validacion/validacion.module').then( m => m.ValidacionPageModule)
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./Paginas/usuarios/usuarios.module').then( m => m.UsuariosPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
