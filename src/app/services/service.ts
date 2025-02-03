import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import { Table_data } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {}

  getData():Observable<Table_data[]>{
    
      return this.http.get<Table_data[]>(`${environment.apiUrl}/data/`)
    }
  


}
