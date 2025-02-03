import { isDevMode } from '@angular/core';
import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import * as StateFeatureKey from "./reducer";
import { AppEffects } from './effect';

export interface State {

  [StateFeatureKey.StateFeatureKey]:StateFeatureKey.State
}

export const reducers: ActionReducerMap<State> = {

  [StateFeatureKey.StateFeatureKey]:StateFeatureKey.reducer
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];

export const effects = [
    AppEffects

]


