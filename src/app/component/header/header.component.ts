import { Component, Input } from '@angular/core';
import { HeaderData } from '../../models/models';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone:true,
  imports: [CommonModule],
  template: `
    <div class="flex header	justify-content-between">
      <img src="apuliasoft.svg" class="logo" alt="Logo" (click)="navigate('home')"> 
      
      <i class="pi pi-bars align-content-center icon" (click)="prova()" style="font-size: 1.5rem"></i>
    </div>
    <div class="menu" *ngIf="menu">
      <ul class="nav-list">
        @for(item of data; track item){
          <li class="font-medium" (click)="navigate(item.router)">{{item.title}}</li>

        }
      </ul>
    </div>
    <ul class="nav-list mt-3 lista">
      @for(item of data; track item){
        <li class="font-medium" (click)="navigate(item.router)">{{item.title}}</li>

      }
    </ul>
    
  `,
  styles: `
 
 .icon {
  display: none;
  }

 .menu{
  background-color: var(--color-secondary);
  position: absolute;
  top: 10%;
  width: 100%;
  left: 0;
  z-index: 1;
  border-color: var(--color-primary);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); 


 }

  img{
    cursor: pointer;

  }

  .nav-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
    flex-grow: 1;
    cursor: pointer;
  }
  
  .nav-list li {
    padding: 20px;
    border-top: 1px solid var(--color-primary); 
  }

  .logo{
    background-color:var(--color-primary)
  }
  

  @media (max-width: 768px) { 
    .header {
      height:100%;

    }

    .icon {
      display: inline-block;
    }

    .lista{
      display: none;
  
    }

    
  }


  @media (min-width: 768px) { 
    .header {
      justify-content: center;
    }

   
    

  }

  `
})
export class HeaderComponent {

  menu:boolean=false
  constructor(private router:Router){

  }

  @Input() data:HeaderData[] = []

  prova(){
    this.menu=!this.menu
  }

  navigate(url){

    this.router.navigate([url])
  }
}
