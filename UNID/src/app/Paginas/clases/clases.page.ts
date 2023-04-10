import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.page.html',
  styleUrls: ['./clases.page.scss'],
})
export class ClasesPage implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,private menu: MenuController,private datePipe: DatePipe) { }
  datafromexcel:any=[];
  Info:any=[];
// @ViewChild('IDdoc') IDdoc: any;
// @ViewChild('crn') crn: any;
// @ViewChild('dom') dom: any;
// @ViewChild('lun') lun: any;
// @ViewChild('mar') mar: any;
// @ViewChild('mie') mie: any;
// @ViewChild('jue') jue: any;
// @ViewChild('vie') vie: any;
// @ViewChild('sab') sab: any;
// @ViewChild('hini') hini: any;
// @ViewChild('hfin') hfin: any;
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
        return {
          IDdoc: row['ID Docente'],
          crn: row['CRN'],
          dom: row['Dom'],
          lun: row['Lun'],
          mar: row['Mar'],
          mie: row['Mie'],
          jue: row['Jue'],
          vie: row['Vie'],
          sab: row['Sab'],
          hini: row['Inicio'],
          hfin: row['Fin']
        };
      });
  
     console.log(dataWithColumns);
      this.datafromexcel = dataWithColumns;
      for(let i of this.datafromexcel){
      this.Info.push({
        ID: i.IDdoc,
        CRN: i.crn,
        D: i.dom,
        L: i.lun,
        Ma: i.mar,
        Mi: i.mie,
        J: i.jue,
        V: i.vie,
        S: i.sab,
        HORAINICIO: this.convertirHora(i.hini),
        HORAFIN: this.convertirHora(i.hfin)             
      });
    }
    };
  
    reader.readAsBinaryString(file);
  }
  convertirHora(num: number) {
    var horas = Math.floor(num * 24);
    var minutos = Math.floor(((num * 24) - horas) * 60);
    var ampm = horas >= 12 ? 'p.m.' : 'a.m.';
    horas = horas % 12;
    horas = horas ? horas : 12; 
    var strHoras = horas < 10 ? '0' + horas : horas;
    var strMinutos = minutos < 10 ? '0' + minutos : minutos;
    var strHora = strHoras + ':' + strMinutos + ' ' + ampm;
    return strHora;
  }
  
}  