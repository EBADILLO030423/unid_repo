import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';
import * as FileSaver from 'file-saver';
import { PostService } from '../../post.service';
import Swal from 'sweetalert2';
import { Dat} from '../../inter';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.page.html',
  styleUrls: ['./clases.page.scss'],
})
export class ClasesPage implements OnInit {
  Token: any= undefined;
  constructor(private route: ActivatedRoute,private menu: MenuController,private navCtrl:NavController,private PostService:PostService) { }
  datafromexcel:any=[];
  Info:any=[];
  REG:number=0;
  Datos:Dat[]=[];

  ngOnInit() {
    this.menu.enable(false);
    this.Token = localStorage.getItem('Token');
    if (!this.Token) {
      this.navCtrl.navigateRoot('/Login');
    }
    if (localStorage.getItem('Tipo')!='Admin'&& localStorage.getItem('Tipo')!='Horarios'){
      this.navCtrl.navigateRoot('/home');
    }
    this.route.params.subscribe((params) => {
      this.REG = params['ID'];
    });
    this.PostService.Horarios(this.REG).subscribe(res=>{this.Datos=res.data;
      for(let i of this.Datos){
        this.Info.push({
          ID: i.attributes.Docente,
          CRN: i.attributes.CRN,
          D: i.attributes.D,
          L: i.attributes.L,
          Ma: i.attributes.Ma,
          Mi: i.attributes.Mi,
          J: i.attributes.J,
          V: i.attributes.V,
          S: i.attributes.S,
          HORAINICIO: i.attributes.HORAINICIO,
          HORAFIN: i.attributes.HORAFIN             
        });
      }
    });

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
  
      this.datafromexcel = dataWithColumns;
      for(let i of this.datafromexcel){
      this.Info.push({
        ID: i.IDdoc,
        CRN: i.crn,
        D: this.conversion(i.dom),
        L: this.conversion(i.lun),
        Ma: this.conversion(i.mar),
        Mi: this.conversion(i.mie),
        J: this.conversion(i.jue),
        V: this.conversion(i.vie),
        S: this.conversion(i.sab),
        HORAINICIO: this.convertirHora(i.hini),
        HORAFIN: this.convertirHora(i.hfin)             
      });
    }
    };
    console.log(this.Info);
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
conversion(dato:string){
if(!dato){
return false
}
else{
  return true
}
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
      for (let i of this.Info) {
        this.PostService.PostHorarios(i.ID+'',i.CRN+'',i.D,i.L,i.Ma,i.Mi,i.J,i.V,i.S,i.HORAINICIO,i.HORAFIN,this.REG).subscribe(res=>console.log(res));
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


}  