import { Component, EventEmitter, Input, Output, Signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { CheckboxModule } from 'primeng/checkbox';
import { SkeletonModule } from 'primeng/skeleton';
import { TooltipModule } from 'primeng/tooltip';
import { selectLoading } from '../../store/reducer';
import { DateWithoutTimePipe } from '../../pipe/date';
import { Table_data } from '../../models/models';
@Component({
  selector: 'app-table',
  standalone:true,
  
  imports: [TooltipModule, SkeletonModule, TableModule, CommonModule, CheckboxModule, DateWithoutTimePipe],
  template: `

  

    <p-table
        [value]="data" 
        [columns]="cols" 
        [resizableColumns]="true"
        >
     
        <ng-template #caption>     
                <div class="flex flex-container justify-content-between mb-2">
                    <div class="flex flex-wrap">
                        <div *ngFor="let filter of filters" class="mr-3 mb-2">
                            <p-checkbox  [binary]="true" (onChange)="aggregate($event.checked,filter)" />
                            <label  class="ml-2">{{filter.toUpperCase()}}</label>
                        </div>
                    </div>                                      
                    <div class=" align-content-center">
                    </div>
                </div>          
        </ng-template>

        <!-- table header -->
        <ng-template #header let-columns>
            <tr>
                <th pResizableColumn *ngFor="let col of columns" class="header">
                    <div class="column_text">
                        {{ col|uppercase }}
                    </div>
                </th>
            </tr>
            
        </ng-template>

        <!-- table body -->
        <ng-template  #body let-data let-columns="columns">
                <tr>   
                    <td *ngFor="let col of columns;" >  
                        @if(loading()){
                            <p-skeleton width="10rem" styleClass="mb-2" />
                        }@else {
                            
                            <div class="truncate" pTooltip="{{ data[col] }}" tooltipPosition="bottom">
                            {{ col=='project' || col == 'employee' ? data[col].name : col=='date' ? (data[col] | dateWithoutTime) : data[col] }}
                            </div>
                        }                      
                    </td>
                </tr>    
        </ng-template>
        <ng-template #emptymessage>
        <tr>
            <td colspan="5" class="text-center text-5xl" >No Data</td>
        </tr>
    </ng-template>
    </p-table>




  `,
  styles: `
  
    td {
        max-width: 200px;
    }

    .truncate {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }


    .header {
        background-color: var(--color-primary);;
    }

    ::ng-deep .p-checkbox-checked .p-checkbox-box{
        background-color: var(--color-primary);
        border-color:var(--color-primary);
    }

    @media (max-width: 768px) { 
        .flex-container {
            flex-direction: column; 
        }
    }

    @media (min-width: 768px) { 
        .flex-container {
            flex-direction: row; 
        }
    }
    
`
})
export class TableComponent {
    @Input() cols:string[]=[]
    @Input() data: Table_data[]=[];
    @Input() filters: string[]=[];

    @Output() aggregateData = new EventEmitter<any>();

    loading:Signal<boolean>

    constructor(private store:Store){
        this.loading = this.store.selectSignal(selectLoading)
    }
    
    aggregate(event,field){
        this.aggregateData.emit({checkbox:event,field})
        
    }
   
    
}
