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
      tableNum: 11,
      isPaid: false, 
      isServed: false, 
      foodOrder: ['BLT', 'Irish stew', "ice-cream"],
      drinkOrder: ['coffee', 'more whiskey']
    }

    const addOrderWithId = async (data) => {
      let docRef = this.firestore.collection('orders').add(data);
      console.log(docRef)
    try {
      const docAdded = await docRef;
      console.log(docAdded.id);
      this.firestore.doc('orders/' + docAdded.id).update({ id: docAdded.id });
      return docRef;
    }
    catch (err) {
      return err;
    }
    }
    addOrderWithId(data);
    
    };
  

  // async addDocIDtoCreatedOrder() {
  
  //   let docRef = this.firestore.collection('orders').add({"title": 42});
  //   console.log(docRef)
  //   try {
  //     const docAdded = await docRef;
  //     console.log(docAdded.id);
  //     this.firestore.doc('orders/' + docAdded.id).update({ id: docAdded.id });
  //     return docRef;
  //   }
  //   catch (err) {
  //     return err;
  //   }
  // }

  // gets all orders in db
  getOrders() {
    const data = this.firestore.collection("orders").snapshotChanges();
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


  getMenu() {
    const data = this.firestore.collection('menu').snapshotChanges();
    console.log(data)
    return (data)
  }
  

  toggleServed(order){
    // console.log("Served is yet to be fixed!")
    // console.log(order)
    return this.firestore
      .doc('orders/' + order.id)
      .update({ isServed: true })
  }

  togglePaid(order){
    // console.log("Served is yet to be fixed!")
    // console.log(order)
    return this.firestore
      .doc('orders/' + order.id)
      .update({ isPaid: true })
  }

}


// Delete below

//   // return new Promise<any>((resolve, reject) =>{
//   //   this.firestore
//   //     .collection('orders').doc(id)
//   //     .update(data)
//   //     .then(res => {}, err => reject(err));
//   // });
//   let db = this.firestore
//   db.collection("orders").doc('1').update({isServed: true})
//   .then(function() {
//     console.log("Document successfully updated!");
// })
// .catch(function(error) {
//     // The document probably doesn't exist.
//     console.error("Error updating document: ", error);
// });
// }



// var washingtonRef = db.collection("cities").doc("DC");

// // Set the "capital" field of the city 'DC'
// return washingtonRef.update({
//     capital: true
// })
// .then(function() {
//     console.log("Document successfully updated!");
// })
// .catch(function(error) {
//     // The document probably doesn't exist.
//     console.error("Error updating document: ", error);
// });
// return new Promise<any>((resolve, reject) =>{
    //   this.firestore
    //     .collection('orders')
    //     .add(data)
    //     .then(res => {}, err => reject(err));