import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import * as XLSX from 'xlsx';
import { PostService } from '../../post.service';
import Swal from 'sweetalert2';
import { Datoss } from '../../inter';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  Token: any= undefined;
  constructor(private route: ActivatedRoute,private menu: MenuController, private navCtrl:NavController,private PostService:PostService) { }
  datafromexcel:any=[];
  Info:any=[];
  REG:number=0;
  Datos:Datoss[]=[];
  ngOnInit() {
    this.menu.enable(false);
    this.Token = localStorage.getItem('Token');
    if (!this.Token) {
      this.navCtrl.navigateRoot('/Login');
    }
    if (localStorage.getItem('Tipo')!='Admin'&& localStorage.getItem('Tipo')!='Registros'){
      this.navCtrl.navigateRoot('/home');
    }
    this.route.params.subscribe((params) => {
      this.REG = params['ID'];
    });
    this.inicia();
  }
  MENU(){
    this.menu.enable(true);
  }
  readExcelFile(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      return;
    }
    
    const reader = new FileReader();
  
    reader.onload = (event: ProgressEvent<FileReader>) => {
      const data = event.target?.result;
      const workbook: XLSX.WorkBook = XLSX.read(data, { type: 'binary' });
      const worksheet: XLSX.WorkSheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(worksheet);
  
      const dataWithColumns = rows.map((row: any) => {
        const marc = typeof row['Marc.'] === 'string' ? row['Marc.'].split(' ') : ['', ''];
        const fecha = marc[0];
        const hora = marc[1]+' '+ marc[2]+marc[3];
        return {
          Ac: row['AC-No.'],
          Nom: row['Nombre'],
          Fecha: fecha,
          Hora: hora,
          Est: row['NvoEstado'],
          Tip: row['Tipo']
        };
      });
  
     console.log(dataWithColumns);
      this.datafromexcel = dataWithColumns;
      for(let i of this.datafromexcel){
      this.Info.push({
        ID: i.Ac,
        Nombre: i.Nom,
        Fecha: i.Fecha,
        Dia: this.onClick(i.Fecha),
        Hora: i.Hora,
        Estado: i.Est,
        Tipo: i.Tip           
      });
    }
    };
  
    reader.readAsBinaryString(file);
  }
  onClick(fechas: any) {
    const parts = fechas.split('/');
    const fecha = new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const diaSemana = diasSemana[fecha.getDay()];
    return(diaSemana);
  }  

  testdedia() {
    const Save = Swal.mixin({
      toast: true,
      position: 'center',
    })
    Save.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        for(let i of this.Info){
          this.PostService.PostEntSal(String(i.ID),i.Nombre,i.Fecha,i.Dia,i.Hora,i.Estado,i.Tipo,this.REG).subscribe(); 
         }
        const s = Swal.mixin({
          toast: true,
          position: 'center',
        })
        s.fire('Saved!', '', 'success')
      } else if (result.isDenied) {
        const d = Swal.mixin({
          toast: true,
          position: 'center',
        })
        d.fire('Changes are not saved', '', 'info')
      }
    })
  }
  inicia(){
    this.PostService.EntSal(this.REG).subscribe(res=>{ this.Datos=res.data;
      for(let i of this.Datos){
        this.Info.push({
          ID: i.attributes.Docente,
          Nombre: i.attributes.Nombre,
          Fecha: i.attributes.Fecha,
          Dia: i.attributes.Dia,
          Hora: i.attributes.Hora,
          Estado: i.attributes.Estado,
          Tipo: i.attributes.Tipo           
        });
      }
    })
  }
}  
