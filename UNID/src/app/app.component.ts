import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Login', url: '/folder/', icon: 'person' },
    { title: 'Home', url: '/home/', icon: 'home' },
    { title: 'Horarios', url: '/clases/', icon: 'pencil' },
    { title: 'Checador Horas', url: '/registro/', icon: 'stopwatch' },
    { title: 'Validación', url: '/validacion/', icon: 'checkmark-done' },
  ];
  constructor(private menu: MenuController) {}

  onClick(){
    this.menu.enable(false);
  }
}
