import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service'

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {

  constructor(private crudService: CrudService) { }

  ngOnInit() {
    this.getOrders();
  }

  orders
  
  getOrders = () => {
    this.crudService.getOrders()
        .subscribe(res => {
        this.orders = res.map((snapshot) => (snapshot.payload.doc.data()));
        console.log(this.orders)
  })
  }
  
  createNewOrders(): void {
    const orders = this.crudService.createNewOrder();
    console.log(orders)
  }
}
