import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Table_data } from '../models/models';

export const StateActions = createActionGroup({
  source: 'State',
  events: {

    'Get Data': props<{ filters?: string[] }>(),
    'Get Data Success': props<{ data: Table_data[] }>(),
    'Get Data Failure': emptyProps(),
   

  }
});
