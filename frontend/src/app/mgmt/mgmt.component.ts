import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service'

@Component({
  selector: 'app-mgmt',
  templateUrl: './mgmt.component.html',
  styleUrls: ['./mgmt.component.scss'],
})
export class MgmtComponent implements OnInit {
  constructor(private crudService: CrudService) { }

  ngOnInit() {
    this.getOrders();
    
 }
  orders

  getOrders = () => {
    this.crudService.getOrders()
        .subscribe(res => {
        this.orders = res.map((snapshot) => (snapshot.payload.doc.data()));
        this.orders = this.orders.filter(order => order.isPaid === false)
   })
  }
  
  // Sets isPaid to 'true' on MGMT screen.
  togglePaid = (order) => {
    this.crudService.togglePaid(order)
  }
  
}
