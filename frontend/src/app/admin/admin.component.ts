import { Component, OnInit } from "@angular/core";
import { CrudService } from "../crud.service";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"]
})
export class AdminComponent implements OnInit {
  constructor(private crudService: CrudService) {}

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
  foodDBItems = [];
  drinkDBItems = [];
  menuItems = [];

  addItem = (item) => {
    const removed = [...item];
    if (this.type === "food") {
      this.foodItems.push(item);
      this.foodDBItems.push(removed.slice(0, 3));
    }
    if (this.type === "drink") {
      this.drinkItems.push(item);
      this.drinkDBItems.push(removed.slice(0, 3));
    }
    this.crudService.itemForm.reset();
  }
 
  removeItem = (item) => {
    console.log('remove', item)
    if (item[3] === "food") {
      let foodIndex = this.foodItems.indexOf(item);
      if (foodIndex > -1) {
        this.foodItems.splice(foodIndex, 1);
        this.foodDBItems.splice(foodIndex, 1);
        
      }
    }
    
    if (item[3] === "drink") {
      let drinkIndex = this.drinkItems.indexOf(item);
      if (drinkIndex > -1) {
        this.drinkItems.splice(drinkIndex, 1);
        this.drinkDBItems.splice(drinkIndex, 1);
      }
    }
  };
  
  onSubmit = () => {
    this.crudService.menuForm.value.name = this.name;
    this.crudService.menuForm.value.address = this.address;
    this.crudService.menuForm.value.tables = this.tables;
    this.crudService.menuForm.value.drinkItems = this.drinkDBItems;
    this.crudService.menuForm.value.foodItems = this.foodDBItems;
    
    let data = this.crudService.menuForm.value;
    this.crudService.createMenu(data).then(res => {  
    })
    this.foodItems = [];
    this.drinkItems = [];
    this.crudService.menuForm.reset();
  }
}
