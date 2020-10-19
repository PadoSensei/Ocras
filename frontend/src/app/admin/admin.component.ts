import { Component, OnInit } from "@angular/core";
import { CrudService } from "../crud.service";


@Component({
  selector: "app-order-list",
  templateUrl: "./order-list.component.html",
  styleUrls: ["./order-list.component.scss"]
})
export class OrderListComponent implements OnInit {
  constructor(private ordersService: CrudService) {}

  ngOnInit() {}

  name;
  address;
  tables;
  item;
  price;
  description;
  type;
  foodItems = [];
  drinkItems = [];
  menuItems = [];

  addItem = (item) => {
    if (this.type === "food") this.foodItems.push(item);
    if (this.type === "drink") this.drinkItems.push(item);
    // this.item = "";
    // this.price = "";
    // this.description = "";
    // this.type = "";
    this.ordersService.itemForm.reset();
  }

  getOrders = () => {
    this.ordersService
    .getOrders()
    .subscribe((res) => {
      res.docs.forEach((doc) => {
        this.menuItems.push(doc.data())
      })
    });
    console.log('menu', this.menuItems)
  }
 
  removeItem = item => {
    // if (item.type === "food") {
    //   let foodIndex = this.foodItems.indexOf(item);
    //   if (foodIndex > -1) this.foodItems.splice(foodIndex, 1);
    // }

    // if (item.type === "drink") {
    //   let drinkIndex = this.drinkItems.indexOf(item);
    //   if (drinkIndex > -1) this.drinkItems.splice(drinkIndex, 1);
    // }
    console.log('pewpewpew', item)
    // delete item.items;
    // delete item.price;
    // delete item.description;
    // delete item.types;

  };

  onSubmit = () => {
    this.ordersService.menuForm.value.name = this.name;
    this.ordersService.menuForm.value.address = this.address;
    this.ordersService.menuForm.value.tables = this.tables;
    this.ordersService.menuForm.value.drinkItems = this.drinkItems;
    this.ordersService.menuForm.value.foodItems = this.foodItems;
    
    let data = this.ordersService.menuForm.value;
    this.ordersService.createMenu(data).then(res => {  
    })
    this.foodItems = [];
    this.drinkItems = [];
    this.ordersService.menuForm.reset();
  }

  deleteOrder = data => this.ordersService.deleteOrder(data);

  // udpateOrder = data => this.ordersService.updateOrder(data);
}
