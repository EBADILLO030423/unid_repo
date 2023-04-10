import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-validacion',
  templateUrl: './validacion.page.html',
  styleUrls: ['./validacion.page.scss'],
})
export class ValidacionPage implements OnInit {
Info:any=[{
  ID:'1234',
  Fecha:'06/03/2023',
  Dia:'Lunes',
  HorE:'08:00 p. m.',
  Ent:'07:30 p. m.',
  HorS:'10:00 p. m.',
  Sal:'10:05 p. m.'
},{
  ID:'5678',
  Fecha:'07/03/2023',
  Dia:'Martes',
  HorE:'09:00 p. m.',
  Ent:'08:30 p. m.',
  HorS:'10:00 p. m.',
  Sal:'10:00 p. m.'
},{
  ID:'9112',
  Fecha:'09/03/2023',
  Dia:'Jueves',
  HorE:'06:00 p. m.',
  Ent:'06:30 p. m.',
  HorS:'07:00 p. m.',
  Sal:'07:05 p. m.'
}];
  constructor(private menu: MenuController) { }

  ngOnInit() {
    this.menu.enable(false);
    } 
  MENU(){
    this.menu.enable(true);
  }

}