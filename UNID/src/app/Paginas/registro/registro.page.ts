import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {


  constructor(private activatedRoute: ActivatedRoute,private menu: MenuController,private datePipe: DatePipe) { }
  datafromexcel:any=[];
  Info:any=[];
  ngOnInit() {
    this.menu.enable(false);
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
    console.log(diaSemana);
  }  
  
  
}  
