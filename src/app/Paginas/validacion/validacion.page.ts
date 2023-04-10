import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController,NavController } from '@ionic/angular';
import { info } from 'console';
import * as moment from 'moment';
import { PostService } from '../../post.service';
import { Dat,Datoss } from 'src/app/inter';
import { Attributes } from '../../inter';


@Component({
  selector: 'app-validacion',
  templateUrl: './validacion.page.html',
  styleUrls: ['./validacion.page.scss'],
})
export class ValidacionPage implements OnInit {
  isModalOpen: boolean | undefined;
  Info2:any=[];
  Horarios:any=[];
  Datos:Dat[]=[];
  REG:number=0;
  Info:any[] = [];
  EntSal:Datoss[]=[];
  Info3:Datoss[]=[];
  Token: any= undefined;
  isLoading = true;
  constructor(private menu: MenuController, private navCtrl:NavController,private route:ActivatedRoute,private PostService:PostService) {}

  async ngOnInit() {
    this.isModalOpen=false;
    this.Token = localStorage.getItem('Token');
    if (!this.Token) {
      this.navCtrl.navigateRoot('/Login');
    }
    if (localStorage.getItem('Tipo')!='Admin'&& localStorage.getItem('Tipo')!='Evaluacion'){
      this.navCtrl.navigateRoot('/home');
    }
    this.menu.enable(false);
  
    this.route.params.subscribe((params) => {
      this.REG = params['ID'];
    });
    this.PostService.EntSalInvalid(this.REG).subscribe(res=>{this.Info3=res.data})
    await this.TestL();
    await this.TestMa();
    await this.TestMi();
    await this.TestJ();
    await this.TestV();
    await this.TestS();
    await this.Test();
  
    setTimeout(() => {
      this.PruebaC();
      this.isLoading=false;
    }, 4500);
  }
  
  Modal(){
    this.isModalOpen=false;
  }
  MENU() {
    this.menu.enable(true);
  }

  calcularDiferenciaE(horaInicio: string, horaFinal: string){
    var hora1 = horaInicio.split(/[:\s]/),
        hora2 = horaFinal.split(/[:\s]/),
        t1 = new Date(),
        t2 = new Date();

    t1.setHours(parseInt(hora1[0]), parseInt(hora1[1]), 0);
    t2.setHours(parseInt(hora2[0]), parseInt(hora2[1]), 0);

    if(t2.getTime() <= t1.getTime()){
        //console.log("La hora final debe ser mayor a la hora de inicio.");
        return ("En rango");
    }

    //Aquí hago la resta
    t1.setHours(t2.getHours() - t1.getHours(), t2.getMinutes() - t1.getMinutes(), 0);

    //Imprimo el resultado
    //console.log("La diferencia es de: " + (t1.getHours() ? t1.getHours() + (t1.getHours() > 1 ? " horas" : " hora") : "") + (t1.getMinutes() ? ", " + t1.getMinutes() + (t1.getMinutes() > 1 ? " minutos" : " minuto") : "") + (t1.getSeconds() ? (t1.getHours() || t1.getMinutes() ? " y " : "") + t1.getSeconds() + (t1.getSeconds() > 1 ? " segundos" : " segundo") : ""));
    var diff =("Diferencia de: " + (t1.getHours() ? t1.getHours() + (t1.getHours() > 1 ? " horas" : " hora") : "") + (t1.getMinutes() ? ", " + t1.getMinutes() + (t1.getMinutes() > 1 ? " minutos" : " minuto") : "") + (t1.getSeconds() ? (t1.getHours() || t1.getMinutes() ? " y " : "") + t1.getSeconds() + (t1.getSeconds() > 1 ? " segundos" : " segundo") : ""));
    return diff
  }
  TestL() {
    this.PostService.Horarios(this.REG).subscribe(res => {
      this.Datos = res.data;
      const docentes:any = {};
      for (let i of this.Datos) {
        if (i.attributes.L == true) {
          const docente = i.attributes.Docente;
          if (!docentes[docente]) {
            docentes[docente] = {
              Docente: i.attributes.Docente,
              HORAINICIO: i.attributes.HORAINICIO,
              HORAFIN: i.attributes.HORAFIN,
              Dia: 'Lunes'
            };
            this.Horarios.push(docentes[docente]); // Agregar el objeto recién creado al array
          } else {
            const inicio = this.convertirHora(docentes[docente].HORAINICIO);
            const fin = this.convertirHora(docentes[docente].HORAFIN);
            const nuevoInicio = this.convertirHora(i.attributes.HORAINICIO);
            const nuevoFin = this.convertirHora(i.attributes.HORAFIN);
            if (nuevoInicio < inicio) {
              docentes[docente].HORAINICIO = i.attributes.HORAINICIO;
            }
            if (nuevoFin > fin) {
              docentes[docente].HORAFIN = i.attributes.HORAFIN;
            }
          }
        }
      }

    });
  }
  TestMa() {
    this.PostService.Horarios(this.REG).subscribe(res => {
      this.Datos = res.data;
      const docentes:any = {};
      for (let i of this.Datos) {
        if (i.attributes.Ma == true) {
          const docente = i.attributes.Docente;
          if (!docentes[docente]) {
            docentes[docente] = {
              Docente: i.attributes.Docente,
              HORAINICIO: i.attributes.HORAINICIO,
              HORAFIN: i.attributes.HORAFIN,
              Dia: 'Martes'
            };
            this.Horarios.push(docentes[docente]); // Agregar el objeto recién creado al array
          } else {
            const inicio = this.convertirHora(docentes[docente].HORAINICIO);
            const fin = this.convertirHora(docentes[docente].HORAFIN);
            const nuevoInicio = this.convertirHora(i.attributes.HORAINICIO);
            const nuevoFin = this.convertirHora(i.attributes.HORAFIN);
            if (nuevoInicio < inicio) {
              docentes[docente].HORAINICIO = i.attributes.HORAINICIO;
            }
            if (nuevoFin > fin) {
              docentes[docente].HORAFIN = i.attributes.HORAFIN;
            }
          }
        }
      }

    });
  }
  TestMi() {
    this.PostService.Horarios(this.REG).subscribe(res => {
      this.Datos = res.data;
      const docentes:any = {};
      for (let i of this.Datos) {
        if (i.attributes.Mi == true) {
          const docente = i.attributes.Docente;
          if (!docentes[docente]) {
            docentes[docente] = {
              Docente: i.attributes.Docente,
              HORAINICIO: i.attributes.HORAINICIO,
              HORAFIN: i.attributes.HORAFIN,
              Dia: 'Miércoles'
            };
            this.Horarios.push(docentes[docente]); // Agregar el objeto recién creado al array
          } else {
            const inicio = this.convertirHora(docentes[docente].HORAINICIO);
            const fin = this.convertirHora(docentes[docente].HORAFIN);
            const nuevoInicio = this.convertirHora(i.attributes.HORAINICIO);
            const nuevoFin = this.convertirHora(i.attributes.HORAFIN);
            if (nuevoInicio < inicio) {
              docentes[docente].HORAINICIO = i.attributes.HORAINICIO;
            }
            if (nuevoFin > fin) {
              docentes[docente].HORAFIN = i.attributes.HORAFIN;
            }
          }
        }
      }

    });
  }
  TestJ() {
    this.PostService.Horarios(this.REG).subscribe(res => {
      this.Datos = res.data;
      const docentes:any = {};
      for (let i of this.Datos) {
        if (i.attributes.J == true) {
          const docente = i.attributes.Docente;
          if (!docentes[docente]) {
            docentes[docente] = {
              Docente: i.attributes.Docente,
              HORAINICIO: i.attributes.HORAINICIO,
              HORAFIN: i.attributes.HORAFIN,
              Dia: 'Jueves'
            };
            this.Horarios.push(docentes[docente]); // Agregar el objeto recién creado al array
          } else {
            const inicio = this.convertirHora(docentes[docente].HORAINICIO);
            const fin = this.convertirHora(docentes[docente].HORAFIN);
            const nuevoInicio = this.convertirHora(i.attributes.HORAINICIO);
            const nuevoFin = this.convertirHora(i.attributes.HORAFIN);
            if (nuevoInicio < inicio) {
              docentes[docente].HORAINICIO = i.attributes.HORAINICIO;
            }
            if (nuevoFin > fin) {
              docentes[docente].HORAFIN = i.attributes.HORAFIN;
            }
          }
        }
      }

    });
  }
  TestV() {
    this.PostService.Horarios(this.REG).subscribe(res => {
      this.Datos = res.data;
      const docentes:any = {};
      for (let i of this.Datos) {
        if (i.attributes.V == true) {
          const docente = i.attributes.Docente;
          if (!docentes[docente]) {
            docentes[docente] = {
              Docente: i.attributes.Docente,
              HORAINICIO: i.attributes.HORAINICIO,
              HORAFIN: i.attributes.HORAFIN,
              Dia: 'Viernes'
            };
            this.Horarios.push(docentes[docente]); // Agregar el objeto recién creado al array
          } else {
            const inicio = this.convertirHora(docentes[docente].HORAINICIO);
            const fin = this.convertirHora(docentes[docente].HORAFIN);
            const nuevoInicio = this.convertirHora(i.attributes.HORAINICIO);
            const nuevoFin = this.convertirHora(i.attributes.HORAFIN);
            if (nuevoInicio < inicio) {
              docentes[docente].HORAINICIO = i.attributes.HORAINICIO;
            }
            if (nuevoFin > fin) {
              docentes[docente].HORAFIN = i.attributes.HORAFIN;
            }
          }
        }
      }
      

    });
  }
  TestS() {
    this.PostService.Horarios(this.REG).subscribe(res => {
      this.Datos = res.data;
      const docentes:any = {};
      for (let i of this.Datos) {
        if (i.attributes.S == true) {
          const docente = i.attributes.Docente;
          if (!docentes[docente]) {
            docentes[docente] = {
              Docente: i.attributes.Docente,
              HORAINICIO: i.attributes.HORAINICIO,
              HORAFIN: i.attributes.HORAFIN,
              Dia: 'Sábado'
            };
            this.Horarios.push(docentes[docente]); // Agregar el objeto recién creado al array
          } else {
            const inicio = this.convertirHora(docentes[docente].HORAINICIO);
            const fin = this.convertirHora(docentes[docente].HORAFIN);
            const nuevoInicio = this.convertirHora(i.attributes.HORAINICIO);
            const nuevoFin = this.convertirHora(i.attributes.HORAFIN);
            if (nuevoInicio < inicio) {
              docentes[docente].HORAINICIO = i.attributes.HORAINICIO;
            }
            if (nuevoFin > fin) {
              docentes[docente].HORAFIN = i.attributes.HORAFIN;
            }
          }
        }
      }
      

    });
  }
  convertirHora(hora: string) {
      const partes = hora.split(" ");
      const horaPartes = partes[0].split(":");
      const horaNum = parseInt(horaPartes[0]);
      const minutosNum = parseInt(horaPartes[1]);
      let hora24;
      if (partes[1] === "p.m." && horaNum !== 12) {
        hora24 = horaNum + 12;
      } else if (partes[1] === "a.m." && horaNum === 12) {
        hora24 = 0;
      } else {
        hora24 = horaNum;
      }
      return hora24 * 60 + minutosNum;
    }
  
  
  Test() {
    this.PostService.EntSal(this.REG).subscribe(res => {
      this.EntSal = res.data;
      for (let i of this.EntSal) {
        if (i.attributes.Estado == 'Ent Hrs Ext') {
          this.Info.push({
            Docente: i.attributes.Docente,
            Nombre: i.attributes.Nombre,
            Fecha: i.attributes.Fecha,
            Dia: i.attributes.Dia,
            HORAE: i.attributes.Hora,
            HORAS: null, // inicializar como nulo
          });
        }
        if (i.attributes.Estado == 'Sal Hrs Ext') {
          // Buscar el objeto que tenga el mismo Docente y Fecha
          const obj = this.Info.find((item) => item.Docente == i.attributes.Docente && item.Fecha == i.attributes.Fecha);
          if (obj) {
            // Concatenar la hora en la propiedad HORAS
            if (obj.HORAS) {
              obj.HORAS += ` ${i.attributes.Hora}`;
            } else {
              obj.HORAS = i.attributes.Hora;
            }
          }
        }
      }
    });
  }
 invalid(){
  this.isModalOpen=false;
  setTimeout(() => {
    this.isModalOpen = true;
  }, 100);
 }
 PruebaC(){
  for (let i = 0; i < this.Info.length; i++) {
    for (let j = 0; j < this.Horarios.length; j++) {
      if (this.Info[i].Dia === this.Horarios[j].Dia && this.Info[i].Docente === this.Horarios[j].Docente) {
        this.Info[i].HORAINICIO = this.Horarios[j].HORAINICIO;
        this.Info[i].HORAFIN = this.Horarios[j].HORAFIN;
      }
    }
  }
  for(let i of this.Info){
  this.Info2.push({
    Docente: i.Docente,
    Nombre: i.Nombre,
    Fecha: i.Fecha,
    Dia: i.Dia,
    HORAE: i.HORAE,
    HORAINICIO: i.HORAINICIO,
    EVE: this.calcularDiferenciaE(String(i.HORAINICIO), String(i.HORAE)),
    HORAS: i.HORAS,
    HORAFIN: i.HORAFIN,
    EVS: this.calcularDiferenciaE(String(i.HORAS), String(i.HORAFIN))
  });
  } 
 }
  
}
