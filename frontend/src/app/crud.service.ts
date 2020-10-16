import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor( private firestore: AngularFirestore ) { }

  //Firestore CRUD actions 
  // create new order in db
  createNewOrder() {
    const data = {
      tableNum: 22,
      isPaid: false, 
      isServed: false, 
      foodOrder: ['BLT', 'Irish stew'],
      drinkOrder: ['coffee', 'more whiskey']
    }
    return new Promise<any>((resolve, reject) =>{
      this.firestore
        .collection('orders')
        .add(data)
        .then(res => {}, err => reject(err));
    });
  }

  // gets all orders in db
  getOrders() {
    const data = this.firestore.collection("orders").snapshotChanges();
    //console.log("coming from the get orders method")
    //console.log(data)
    return (data)
  }

  

  // getOrders(): Observable<Order[]> {
  //   return of(ORDERS);
  // }

}
