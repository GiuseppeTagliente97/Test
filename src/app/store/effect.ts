import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map, catchError, of } from 'rxjs';
import { StateActions } from './action';
import { MessageService } from 'primeng/api';
import { DataService } from '../services/service';
import { Table_data } from '../models/models';



@Injectable()
export class AppEffects {

  aggregateData(fields: string[], data:Table_data[]) {
    
    const aggregated = new Map();
  
    
    data.reduce((map, item: Table_data) => {
      const key = fields.map(f => item[f]?.id ?? '').join('|');

      if (!map.has(key)) {
        map.set(key, { ...item, hours: 0 });
      }

      const entry = map.get(key)!;
      entry.hours += item.hours; 

      return map;
    }, aggregated);
  
    return Array.from(aggregated.values()).sort((a, b) => {
      if (fields.length === 1) {
          return a[fields[0]].id - b[fields[0]].id;
      } else if (fields.length === 2) {
        switch (fields[0]){
          case 'project':
            if (a[fields[0]].id !== b[fields[0]].id ) {
              return a[fields[0]].id - b[fields[0]].id;
            }
            return b.hours - a.hours;
          case 'employee':
            if (a[fields[0]].id !== b[fields[0]].id) {
              return a[fields[0]].id - b[fields[0]].id;
            }
            return a[fields[1]].id - b[fields[1]].id;
        }
         
      }
      return 0;
    })
  }


  getData$ = createEffect (() =>{
    return this.actions$.pipe(
      ofType(
        StateActions.getData, 
      ),
      concatMap(({filters})=>
        this.service.getData().pipe(
          map(response => {
            
            
            if(filters && filters.length >0){
              response = this.aggregateData(filters, response);

            }
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Get Data Success' })

            return StateActions.getDataSuccess({data:response})
          }),
          catchError(error => {
            this.messageService.add({ severity: 'error', summary: 'Failure', detail: 'Get Data Failure' })

            return of(StateActions.getDataFailure())
          }
          )
        )
      )
    )
  
  }, {functional:true});

  constructor(private actions$: Actions, private service:DataService, private messageService:MessageService) {}
}
