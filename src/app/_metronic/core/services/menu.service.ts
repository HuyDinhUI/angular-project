import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable()
export class MenuServices {
  
  
  constructor(private http: HttpClient) { }

  layMenuChucNang(): Observable<any[]> {
    
    return this.http.get<any[]>(environment.ApiRoot + `/menu/LayMenuChucNang`);
  }
}