import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { PostService } from '../../post.service';
import { RootObject4} from '../../inter';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {
  Info:RootObject4 | any |undefined | null;
  constructor(private menu: MenuController, private PostService:PostService,private navCtrl:NavController) { }

  ngOnInit() {
    this.menu.enable(false);
    this.PostService.Usuarios().subscribe(res=>{this.Info=res});
    if (localStorage.getItem('Tipo')!='Admin'){
      this.navCtrl.navigateRoot('/home');
    }
  }
  MENU(){
    this.menu.enable(true);
  }
  update(id:any,user:any,email:any,tipo:any){
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
      this.PostService.UpdateUser(id,user,email,tipo).subscribe()
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

  async creatuser() {
    const Save = Swal.mixin({
      toast: true,
      position: 'center',
    });
  
    const { value: formValues, isConfirmed } = await Save.fire({
      title: 'Nuevo Usuario',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Username">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Email">' +
        '<input id="swal-input3" class="swal2-input" type="password" placeholder="Password">' +
        '<select id="swal-input4" class="swal2-input"><option value="Admin">Admin</option><option value="Horarios">Horarios</option><option value="Registros">Registros</option><option value="Evaluacion">Evaluacion</option></select>',
      focusConfirm: false,
      confirmButtonText: 'Aceptar',
      showCancelButton: true,
      cancelButtonText: 'Rechazar',
      preConfirm: () => {
        const input1 = document.getElementById('swal-input1') as HTMLInputElement;
        const input2 = document.getElementById('swal-input2') as HTMLInputElement;
        const input3 = document.getElementById('swal-input3') as HTMLInputElement;
        const input4 = document.getElementById('swal-input4') as HTMLSelectElement;
        return input1 && input2 && input3 && input4 ? [input1.value, input2.value, input3.value, input4.value] : null;
      }
    });
  
    if (formValues && isConfirmed) {
      this.PostService.CreatUser(formValues[0], formValues[1], formValues[2], formValues[3]).subscribe(
        (response) => {
          // Aquí puedes agregar cualquier lógica que necesites cuando la petición se complete con éxito.
          console.log(response);
          setTimeout(() => {
            window.location.reload();
          },1000);
        },
        (error) => {
          // Aquí puedes agregar cualquier lógica que necesites cuando la petición falle.
          console.error(error);
          Save.fire({
            icon: 'error',
            title: 'Error al crear usuario',
            text: error.error.error.message // Mostramos el mensaje de error recibido del servidor.
          });
        }
      );
    } else {
      Save.fire('No creado', '', 'info');
    }
  }
  
  
  
  delate(id:number){
    const Save = Swal.mixin({
      toast: true,
      position: 'center',
    })
    Save.fire({
      title: 'Estas seguro de eliminar el usuario?',
      showDenyButton: true,
      confirmButtonText: 'Aceptar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.PostService.DelateUser(id).subscribe(res=>console.log(res))
        const s = Swal.mixin({
          toast: true,
          position: 'center',
        })
        s.fire('Eliminado!', '', 'success')
        setTimeout(() => {
          window.location.reload();
        },1000);
      } else if (result.isDenied) {
        const d = Swal.mixin({
          toast: true,
          position: 'center',
        })
        d.fire('No eliminado', '', 'info')
      }
    })
    }

}
