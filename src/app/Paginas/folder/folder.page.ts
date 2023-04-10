import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { PostService } from '../../post.service';
import { LoginResponse } from "../../inter";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  constructor(private activatedRoute: ActivatedRoute,private menu: MenuController, private PostService:PostService, private navCtrl:NavController) { }
  Token:string='';
  Tipo:string='';
  ngOnInit() {
    this.menu.enable(false);
  }
  MENU(){
    this.menu.enable(true);
  }
  Log(email:any, Pass:any){
    this.PostService.Login(email,Pass).subscribe( 
      (res:any) => {
      this.Token=res.jwt;
      this.Tipo=res.user.Tipo;
      localStorage.setItem('Token', this.Token);
      localStorage.setItem('Tipo', this.Tipo);
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        didOpen: (toast) => {
          setTimeout(() => {
            this.navCtrl.navigateRoot('/home', { animated: true });
            setTimeout(() => {
              window.location.reload();
            },100);
        }, 2500) 
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Login Successful'
      })
    
    },
    (error) => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)   
          }
        })
        
        Toast.fire({
          icon: 'error',
          title: error.error.error.message
        })
      });
  }

}
