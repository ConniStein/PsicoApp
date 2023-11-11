import { Injectable } from '@angular/core';
import { ApiRoot } from './apiroute';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


let apiUrl = ApiRoot.url;

@Injectable({
  providedIn: 'root'
})
export class DirectoryService {

  constructor(private http: HttpClient) { }

  /*Usuarios*/
  /*preRegister(token:any, data:any) {
    return new Promise((resolve, reject) => {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(apiUrl+ '/pre-registration/' , data,{headers: headers})
    .subscribe(res => {
            resolve(res);
    }, (err) => {
            reject(err);
    });

  });
  }*/

  preRegister(data: any) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(apiUrl + '/pre-registration/', data, { headers: headers })
      .pipe(
        catchError((error: any) => {
          console.error('Error occurred: ', error);
          return throwError(error);
        })
      );
  }

  updateMatchForm(data:any, id:any){
    return new Promise((resolve, reject)=>{
      let headers = new HttpHeaders({'Content-Type': 'application/json'});
      this.http.patch(apiUrl + '/update-form-match/'+id , data, {headers : headers})
      .subscribe(res=>{
        resolve(res);
      },(err)=>{
        reject(err);
      });
    });
  }
  
  

  

}
