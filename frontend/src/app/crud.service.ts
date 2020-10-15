import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor( private firestore: AngularFirestore ) { }

  //Firestore CRUD actions example
  getOrders() {
    return this.firestore.collection("orders").snapshotChanges();
  }


}
