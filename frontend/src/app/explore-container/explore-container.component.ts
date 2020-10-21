import { Component, OnInit, Input } from '@angular/core';
import { CrudService } from '../crud.service'

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit {
  @Input() name: string
  
  constructor(private crudService: CrudService) { }

  ngOnInit() {
    
    
 }
  orders

  // getOrders = () => {
  //   this.crudService.getOrders()
  //       .subscribe(res => {
  //       this.orders = res.map((snapshot) => (snapshot.payload.doc.data()));
  //       console.log(this.orders)
  // })
  // }
  
  // createNewOrders(): void {
  //   const orders = this.crudService.createNewOrder();
  //   console.log(orders)
  // }

}


