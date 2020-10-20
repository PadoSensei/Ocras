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
    this.getMenu();
  }

  name;
  address;
  foodItems = [];
  drinkItems = [];
  selectedItems = [];
  menuItems = [];
  
  getMenu = () => {
    this.crudService.getMenu()
      .subscribe(res => {
      this.menuItems = res.map((snapshot) => (snapshot.payload.doc.data()));
      this.name = this.menuItems[0].name;
      this.address = this.menuItems[0].address;
      
      for (let i = 0; i < this.menuItems[0].foodItems.length; i += 3) {
        this.foodItems.push(this.menuItems[0].foodItems.slice(i, i + 3))
      }

      for (let i = 0; i < this.menuItems[0].drinkItems.length; i += 3) {
        this.drinkItems.push(this.menuItems[0].drinkItems.slice(i, i + 3))
      }
    })
  }
  
  createNewOrders(): void {
    const orders = this.crudService.createNewOrder();
    console.log(orders)
  }

  //Not required
  // handleClick(event): void {
  //   this.selectedItems.push(event.currentTarget.childNodes[0].childNodes[0].innerHTML);
  //   event.currentTarget.style.backgroundColor = '#abcdeb';
  //   event.currentTarget.style.transform = `rotate(${Math.floor(Math.random() * (4 - -4) + -4)}deg) translateX(-15%)`;
  //   console.log(event.currentTarget.childNodes[0].childNodes[0]);
  // }
}
