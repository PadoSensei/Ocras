import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor( private firestore: AngularFirestore ) { }
  itemForm = new FormGroup({        
    drinkOrder: new FormControl(''), 
    foodOrder: new FormControl(''), 
    item: new FormControl(''),
    price: new FormControl(''),
    description: new FormControl(''),
    type: new FormControl(''),
  })

  menuForm = new FormGroup({        
      name: new FormControl(''), 
      address: new FormControl(''), 
      tables: new FormControl(''),
      drinkItems: new FormControl([]),
      foodItems: new FormControl([]),
  })
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

  createMenu(data) {
    console.log('after', data)
    const menuData = {
      name: data.name,
      address: data.address,
      tables: data.tables,
      drinkItems: data.drinkItems.flat(),
      foodItems: data.foodItems.flat()
    }
    return this.firestore
      .collection("menu")
      .add(menuData)
      .then(res => {}, err => console.error(err));
  }

  // getOrders(): Observable<Order[]> {
  //   return of(ORDERS);
  // }

}
