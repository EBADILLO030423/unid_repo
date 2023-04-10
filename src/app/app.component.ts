import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home/', icon: 'home' },
  ];
  constructor(private menu: MenuController) {}
  buttonDisabled:boolean=true;
  Admin:boolean=true;
  ngOnInit(){
    if (!localStorage.getItem('Token')){
      this.buttonDisabled = true;
    }
    else{
      this.buttonDisabled = false; 
    }
    if (localStorage.getItem('Tipo')=='Admin'){
      this.Admin = true;
      this.appPages.push({ title: 'Usuarios', url: '/usuarios/', icon: 'person' });
    }
    else{
      this.Admin = false; 
    }
  }
  onClick(){
    this.menu.enable(false);
  }
  onClick2(){
      localStorage.clear();
      setTimeout(() => {
        window.location.reload();
    }, 100) 
  }
}
