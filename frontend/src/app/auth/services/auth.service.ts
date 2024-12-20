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
    console.log("header: ", headers)
    console.log("method: ", method)
    console.log("url: ", url)
    console.log("data: ", data)

    return axios({
      method: method,
      url:url,
      data: data,
      headers: headers
    });
  }

  getAuthToken():string | null{
    console.log(window)
    if(typeof window != undefined){
      return window.localStorage.getItem("auth_token");
    }
    return null;
  }

  setAuthToken(token:string | null): void{
    if (token != null){
      window.localStorage.setItem("auth_token",token);
    }else{
      window.localStorage.removeItem("auth_token");
    }
  }
}
