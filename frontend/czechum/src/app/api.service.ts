import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private serverurl = "localhost/8888";
  constructor(private http: HttpClient) { }

  selectAll(table: string){
    return this.http.get(this.serverurl + '/' + table);
  }
  delete(table: string, field: string, value: string){
    return this.http.delete(this.serverurl + '/' + table + '/' + field + '/' + value);
  }
  selectByField(table: string, field: string, value: string){
    return this.http.get(this.serverurl + '/' + table + '/' + field + '/' + value);
  }
  insert(table:string, data: object){
    return this.http.post(this.serverurl + '/' + table, data);
  }
  update(table: string, id: number, data: object){
    return this.http.patch(this.serverurl + '/' + table + '/' + id, data);
  }
}
