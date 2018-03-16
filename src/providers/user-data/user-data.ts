import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { SignUp } from "../../interfaces/user-options";
/*
  Generated class for the UserDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserDataProvider {
  _favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
///////////////////////////////////////////////////////////
  employees=[];

  //private mongoURL: string = "https://api.mongolab.com/api/1/databases/(DataBase_Name)/collections/";
  private mongoURL: string= "https://api.mongolab.com/api/1/databases/duke/collections/";
  //private apiKey: string = "(API_key_name)";
  private apiKey: string="8CElfGmeiIwc5errIFY3flpWvqq_HZnc";
  // private apiKey:any;
  // private apiKey1:any;
  //collection name means table name
  private EmployeesCollection: string="users";
  private EmployeesConnectionString: string= this.mongoURL + this.EmployeesCollection + "?apiKey=" + this.apiKey;
  private EmployeesConnectionString1: string= this.mongoURL + this.EmployeesCollection + "?apiKey=" ;
 

  //Full connection String of MongoDB connection
  //https://api.mongolab.com/api/1/databases/sidswap/collections/Employees?apiKey=8CElfGmeiIwc5errIFY3flpWvqq_HZnc
  /////////////////////////////////////////////////////////////////////////
  constructor(
    public _http: HttpClient,
    public events: Events,
    public storage: Storage) {
    console.log('Hello UserDataProvider Provider');
  }

  hasFavorite(sessionName: string): boolean {
    return (this._favorites.indexOf(sessionName) > -1);
  };

  addFavorite(sessionName: string): void {
    this._favorites.push(sessionName);
  };

  removeFavorite(sessionName: string): void {
    let index = this._favorites.indexOf(sessionName);
    if (index > -1) {
      this._favorites.splice(index, 1);
    }
  };

  login(username: string): void {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    this.events.publish('user:login');
  };

  signup(username: string): void {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    this.events.publish('user:signup');
  };

  logout(): void {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('username');
    this.events.publish('user:logout');
  };

  setUsername(username: string): void {
    this.storage.set('username', username);
  };

  getUsername(): Promise<string> {
    return this.storage.get('username').then((value) => {
      return value;
    });
  };

  hasLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  };

  checkHasSeenTutorial(): Promise<string> {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
      return value;
    });
  };


  // f: fields to include: {id:1}  1 yes, 0 no
	// s: sort direction: {id:-1}    1 ASC -1 DESC
	mongoSelectOne(collection: string, field: string, sort: string):Observable<SignUp[]> {
		return this._http.get<SignUp[]>(this.mongoURL + collection + '?f=' + field + '&s=' + sort + '&l=1&apiKey=' + this.apiKey);
	}

	mongoSelect(collection: string, query: string):Observable<SignUp[]> {
		return this._http.get<SignUp[]>(this.mongoURL + collection + '?q=' + query + '&apiKey=' + this.apiKey);
	}


	mongoCount(collection: string, query: string) {
		return this._http.get(this.mongoURL + collection + '?q=' + query + '&c=true&apiKey=' + this.apiKey);
	}

	// sk: results to skip
	// l: limit
	/*mongoSelectSkip(collection: string, query: string, sk: number, l: number) {
		return this.http.get(this.mongoURL + collection + '?q=' + query + '&sk=' + sk + '&l=' + l + '&apiKey=' + this.apiKey)
			.map(res => res.json());
	}*/

	mongoInsert(collection: string, fileObj) {
		var headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    console.log(fileObj);
    var abc = JSON.stringify(fileObj);
    console.log(JSON.stringify(fileObj));
		return this._http.post(this.mongoURL + collection + "?apiKey=" + this.apiKey,
      //JSON.stringify(fileObj), //{"x":1, "y":2}
      // {"x":1, "y":2},
      fileObj,
			{ headers: headers }
		);
	}

	mongoUpdate(collection: string, fileID: string, newValueObj) {
		var headers = new HttpHeaders();
		headers.append("Content-Type", "application/json");
		return this._http.put(this.mongoURL + collection + '?q=' + fileID + '&apiKey=' + this.apiKey, //{"_id":123}
			JSON.stringify({ "$set": newValueObj }), //{ "x": 3 }
			{ headers: headers }
		);
	}
	
	mongoDelete(collection: string, mongoID) {
		return this._http.delete(this.mongoURL + collection + "/" + mongoID + '?apiKey=' + this.apiKey);
	}


}
