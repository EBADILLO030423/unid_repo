import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonModal, MenuController, NavController } from '@ionic/angular';
import { PostService } from '../../post.service';
import { Datum} from '../../inter';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  getWeek: string | undefined;
  getYear: number | undefined;
  isModalOpen: boolean | undefined;
  Token: any= undefined;
  constructor(private activatedRoute: ActivatedRoute,private menu: MenuController, private navCtrl:NavController, private PostService:PostService) { }
  Info:any=[];
  Datos:Datum[]=[];
  ngOnInit() {
    this.menu.enable(false);
    this.isModalOpen=false;
    this.Token = localStorage.getItem('Token');
    if (!this.Token) {
      this.navCtrl.navigateRoot('/Login');
    }
    else{
      this.PostService.Registros().subscribe(res=>{
        this.Datos=res.data;
      });
    }
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
            this.PostService.PostRegistros(this.getWeek,this.getYear+'').subscribe(res=> console.log(res));
            this.isModalOpen=false;
  }

  nav(id:number){
    // Definir opciones del select
    const options = ['Registro de Horarios', 'Registro Entradas y Salidas', 'Evaluacion de Horas'];
  
    // Función que valida la selección del usuario
    const validator = (selectedOption: string) => {
      if (!selectedOption) {
        return 'Debes seleccionar una opción';
      }
      
      // Comprobar si el usuario tiene acceso a la página seleccionada
      if ((selectedOption === 'Registro de Horarios' && localStorage.getItem('Tipo') !== 'Admin' && localStorage.getItem('Tipo') !== 'Horarios') ||
          (selectedOption === 'Registro Entradas y Salidas' && localStorage.getItem('Tipo') !== 'Admin' && localStorage.getItem('Tipo') !== 'Registros') ||
          (selectedOption === 'Evaluacion de Horas' && localStorage.getItem('Tipo') !== 'Admin' && localStorage.getItem('Tipo') !== 'Evaluacion')) {
        return 'No tienes acceso a esta página';
      }
      
      return null;
    };
    
    const Prueba = Swal.mixin({
      toast: true,
      position: 'center',
      showDenyButton: true,
      denyButtonText: `Cancelar`,
    });
    
    // Mostrar alerta con select
    Prueba.fire({
      title: 'Selecciona una opción',
      input: 'select',
      inputOptions: options.reduce((obj, option) => ({ ...obj, [option]: option }), {}),
      inputValidator: validator,
    }).then((result) => {
      if (result.isConfirmed) {
        const selectedOption = result.value; // Obtener opción seleccionada
        
        this.navCtrl.navigateRoot(`${selectedOption}/${id}`, { animated: true });
      }
    });
  }
  

}