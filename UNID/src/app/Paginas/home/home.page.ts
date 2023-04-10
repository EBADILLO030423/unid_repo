import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonModal, MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  getWeek: string | undefined;
  getYear: number | undefined;
  isModalOpen: boolean | undefined;
  constructor(private activatedRoute: ActivatedRoute,private menu: MenuController, private navCtrl:NavController) { }
  Info:any=[];
  ngOnInit() {
    this.menu.enable(false);
    this.isModalOpen=false;
  }
  MENU(){
    this.menu.enable(true);
  }
  abrirmodal(){
    this.isModalOpen=false;
    setTimeout(() => {
      this.isModalOpen = true;
    }, 100);
  }

  cancel() {
    this.isModalOpen= false;
  }

  confirm(fecha:any) {
    const inputString = fecha;
            const parts = inputString.split('-');
            const year = parts[0];
            const mes = parts[1];
            const mes2 = mes;
            const meses=['Enero','Febrero', 'Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre', 'Octubre' ,'Noviembre','Diciembre']
            this.getWeek = String(meses[parseInt(mes2)-1]);
            this.getYear = parseInt(year);
            this.Info.push({
              ID: 1,
              Semana: this.getWeek,
              Año: this.getYear,           
            });
            this.isModalOpen=false;
  }
  onClick(){
    this.navCtrl.navigateRoot('./Paginas/clases',{animated:true});
  }

}