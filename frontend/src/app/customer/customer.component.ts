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
    let backgr = document.querySelector('#background-content')
    //console.log(backgr);
    this.getMenu();
    // Below will send hardcoded table into db on page load.
    this.createNewOrders(this.data)
  }

  test;
  name;
  address;
  foodItems = [];
  drinkItems = [];
  selectedItems = [];
  menuItems = [];

  data = {
  tableNum: 4,
      isPaid: false, 
      isServed: false, 
      foodOrder: ['BLT', 'Pop tarts', "ice-cream"],
      drinkOrder: ['coffee', 'more whiskey'],
      timeOfOrder: Date()
  }


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
  
  createNewOrders(data): void {
    const orders = this.crudService.createNewOrder(data);
    //console.log(orders)
  }


  addItem = (item) => {
    console.log('event', item);
    console.log('item', this.test);
  }

  handleClick(event): void {
    this.selectedItems.push(event.currentTarget.childNodes[0].childNodes[0].innerHTML);
    event.currentTarget.style.backgroundColor = '#abcdeb';
    event.currentTarget.style.transform = `rotate(${Math.floor(Math.random() * (4 - -4) + -4)}deg) translateX(-15%)`;
    console.log(event.currentTarget.childNodes[0].childNodes[0]);
  }

}
