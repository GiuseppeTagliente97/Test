import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { StateActions } from './store/action';
import { HeaderData } from './models/models';
import { HeaderComponent } from './component/header/header.component';
import { Toast, ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, Toast, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  header_data: HeaderData[] = [
    {
      title:'Home',
      router:'/home'
    }
    
  ]

  constructor(private store:Store){
  }
  

  ngOnInit(): void {
    this.store.dispatch(StateActions.getData({}))

  }
}
