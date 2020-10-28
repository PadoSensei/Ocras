import { Component, OnInit } from "@angular/core";
import { CrudService } from "../crud.service";
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { Menu, MenuItem } from './menu';

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"]
})
export class AdminComponent implements OnInit {
  constructor(private crudService: CrudService) {}

  ngOnInit() {}

  qrElementType; 
  qrCorrectionLevel; 
  qrValue;
  qrValues = [];

  name;
  address;
  tables;
  item;
  price;
  description;
  type;
  items: MenuItem[] = [];
  foodItems = [];
  drinkItems = [];

  addItem = (item: MenuItem) => {
    console.log('adminitem', item)
    if (item.type === 'food') {
      this.foodItems.push(item)
    } else {
      this.drinkItems.push(item)
    }   
    this.items.push(item)
    this.crudService.itemForm.reset();
  }
 
  removeItem = (item: MenuItem) => {
    if (item.type === "food") {
      let foodIndex = this.foodItems.indexOf(item);
      if (foodIndex > -1) {
        this.foodItems.splice(foodIndex, 1);
      }
    }
    
    if (item.type === "drink") {
      let drinkIndex = this.drinkItems.indexOf(item);
      if (drinkIndex > -1) {
        this.drinkItems.splice(drinkIndex, 1);
      }
    }
  };
  
  onSubmit = () => {
    const menu = {
      restaurant: {
        name: this.name,
        address: this.address,
        id: 'umgcQO3StZTMaWZyJNSw',
      },
      items: this.items,
    }

    const tableNum = this.tables

    this.crudService.createMenu(menu).then(res => {
       
      for (let i = 1; i <= tableNum; i++) {
        this.qrElementType = NgxQrcodeElementTypes.URL;
        this.qrCorrectionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
        this.qrValue = `https://p-angular-cb7fc.web.app/tabs/table?id=${res.id}&table=${i}`;
        this.qrValues.push(this.qrValue);
      }
    })
    this.foodItems = [];
    this.drinkItems = [];
    this.crudService.menuForm.reset();
  }
}
