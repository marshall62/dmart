import { Injectable } from '@angular/core';
import * as Realm from "realm-web";
import { Observable, defer, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MongoAtlasService {

  mongodb: any;
  artworks: any;
  config: any;
  realmApp: any;

  constructor() {
    const id = "dm-art-api-jznsb";  // TODO This should probably go into an environment where it will be secret.
    const config = {id,};
    this.realmApp = new Realm.App(config);
    this.login();
  }
  

  login2 (): Observable<any> {
    return defer(() => from(this.login())) as Observable<any>;
  }

  async login () {
    const credentials = Realm.Credentials.anonymous();
    try {
      const user = await this.realmApp.logIn(credentials);
      console.log("Successfully logged in!", user.id);
      this.mongodb = this.realmApp.currentUser.mongoClient("mongodb-atlas");
      this.artworks = this.mongodb.db("artworks").collection("works");
      this.config = this.mongodb.db("artworks").collection("config");
      console.log("artworks",this.artworks);
    } catch (err) {
      console.error("Failed to log in", err.message);     
    }

  }
}
