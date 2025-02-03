import { Component, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { TableComponent } from '../../dinamic_components/table/table.component';
import { StateActions } from '../../store/action';
import { selectData } from '../../store/reducer';
import { Table_data } from '../../models/models';

@Component({
  selector: 'app-home',
  standalone:true,
  imports: [TableComponent],
  template: `
  <div class="p-6">
    <div class="header_text mb-3">Aggregation Data</div>
    <div class="flex flex-column gap-2">
      <div class="flex justify-content-center w-full custom-container">
          <app-table  class="w-full"[cols]="cols" [filters]="filters" [data]="data_table()" (aggregateData)="aggregate($event)"></app-table>
      </div>
    </div>
  </div>

  `,
  styles: `
  .custom-container {
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); 
    border-radius: 10px;
    border: 2px solid var(--color-secondary); 
    padding: 16px; 
    background-color: #fff; 
}
`
})
export class HomeComponent {
 
  filters:string[] =['project','employee']
  cols:string[] =['project','employee', 'date','hours']
  data_table:Signal<Table_data[]>
  selected_filter:string[]=[]

  constructor(private store:Store){
    this.data_table=this.store.selectSignal(selectData)
  }

  aggregate(event){
    if (event.checkbox) {
      this.selected_filter=[...this.selected_filter,event.field]
    } else {
      this.selected_filter = this.selected_filter.filter(f => f !== event.field);
    }

    this.store.dispatch(StateActions.getData({filters:this.selected_filter}))

    this.cols = this.selected_filter.length>0?[...this.selected_filter,'hours']:['project','employee', 'date','hours']
  }

  
  

}
