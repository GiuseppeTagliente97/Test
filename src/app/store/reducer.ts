import { createFeature, createReducer, on } from '@ngrx/store';
import { StateActions } from './action';
import { Table_data } from '../models/models';

export const StateFeatureKey = 'State';

export interface State {

  loading:boolean;
  data:Table_data[];

}

export const initialState: State = {

  loading:false,
  data:[],
 
};

export const reducer = createReducer(
  initialState,
  on(StateActions.getData, (state) => ({
    ...state,
    loading:true

  })),
  on(StateActions.getDataSuccess, (state, action) => ({
    ...state,
    data:action.data,
    loading:false,

  })),
  on(StateActions.getDataFailure, (state, action) => ({
    ...state,
    loading:false,

  })),
  
);

export const StateFeature = createFeature({
  name: StateFeatureKey,
  reducer,
});


// selectors
export const {
    selectLoading,     
    selectData
} = StateFeature;




