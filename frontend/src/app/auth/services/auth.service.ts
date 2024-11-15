import { Injectable } from '@angular/core';
import axios from 'axios';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( ) {
    axios.defaults.baseURL ="http://localhost:8080"
    axios.defaults.headers.post["Content-type"] = "application/json"

  }

  request(method: string, url:string, data: any): Promise<any>{
    let headers = {}
    if(this.getAuthToken() != null){
      headers = {"Authorization": "Bearer " + this.getAuthToken()};
    }
    return axios({
      method: method,
      url:url,
      data: data,
      headers: headers
    });
  }

  getAuthToken():string | null{
    return window.localStorage.getItem("auth_token");
  }

  setAuthToken(token:string | null): void{
    if (token != null){
      window.localStorage.setItem("auth_token",token);
      console.log("token:", this.getAuthToken)
    }else{
      window.localStorage.removeItem("auth_token");
    }
  }
}
