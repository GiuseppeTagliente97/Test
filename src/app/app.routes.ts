import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path:"",
        redirectTo:"home",
        pathMatch:"full"
    },
    {
        path:"home",
        loadComponent:()=> import ("./component/home/home.component").then((mod)=> mod.HomeComponent)   
    },
    


];
