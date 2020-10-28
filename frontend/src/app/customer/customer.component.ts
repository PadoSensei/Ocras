// tslint:disable
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from '../crud.service'
import { Menu } from '../admin/menu'

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  constructor(
    private crudService: CrudService,
    private route: ActivatedRoute
    ) { }

  
    id: string;
    table: number = -1;

    ngOnInit() {
      let backgr = document.querySelector('#background-content')
      //console.log(backgr);
      this.route.queryParams.subscribe(params => {
        this.id = params.id;
        this.table = params.table;
        this.getMenu();
      });     
    }
  
  disableButton;
  name;
  address;
  total = 0;
  foodItems = [];
  drinkItems = [];
  selectedItems = [];

  data = {
    tableNum: this.table,
    isPaid: false, 
    isServed: false, 
    foodOrder: [],
    drinkOrder: [],
    timeOfOrder: Date(),
    bill: 0
  }

  // Three arrays will be added to the data, 
  // On 'Submit', data will be pushed to the DB

  foodSelection = []
  drinkSelection = []
  pricesOfSelected = []

  // Identify if the item is food or drink by placing them here for easy comparison.
  simpleFoodArray = []
  simpleDrinkArray = []
  
  

  getMenu = () => {
    this.crudService.getMenu(this.id)
      .subscribe((res: Menu) => {
        this.name = res.restaurant.name;
        this.address = res.restaurant.address;

        for (let index = 0; index < res.items.length ; index++) {
          if (res.items[index].type === 'food') {
            this.foodItems.push(res.items[index])
          } else {
            this.drinkItems.push(res.items[index])   
        }
      }
    })
  }
  
  createNewOrders(data): void {
    const orders = this.crudService.createNewOrder(data);
  }

  handleClick(event): void {
    
    const selectedItemName = event.currentTarget.childNodes[0].childNodes[0].textContent
    const selectedItemPrice = event.currentTarget.childNodes[1].childNodes[0].textContent
    
    this.sendItem(selectedItemName)
    // Push selected price to price array
    this.pricesOfSelected.push(selectedItemPrice)
    event.currentTarget.style.backgroundColor = '#abcdeb';
    event.currentTarget.style.transform = `rotate(${Math.floor(Math.random() * (4 - -4) + -4)}deg) translateX(-15%)`;
    let clicked = event.currentTarget.childNodes[0].childNodes[0].textContent;
    this.selectedItems.push(clicked);
    event.currentTarget.style.backgroundColor = '#abcdeb';
    event.currentTarget.style.transform = `rotate(${Math.floor(Math.random() * (4 - -4) + -4)}deg) translateX(-4vw)`;    

    let current:any = Number(event.currentTarget.childNodes[1].childNodes[0].textContent.slice(1))
    let sum = Number(Number.parseFloat(this.total + current).toFixed(2));    
    this.total = sum
    console.log(this.total);
    
    
  }

  // Create simple array of food that can quickly be checked. 
  createSimpleFoodArray(){
    this.foodItems.forEach(element => {
      this.simpleFoodArray.push(element[0])
    });
  }

  createSimpleDrinkArray(){
    this.drinkItems.forEach(element => {
      this.simpleDrinkArray.push(element[0])
    })
    
  }

  sendItem(selected) {
    //check to see if selected in food
      if(this.simpleDrinkArray.includes(selected)){
        console.log("it's a drink")
        this.drinkSelection.push(selected)
      } else {
        console.log('its a food')
        this.foodSelection.push(selected)
      }
    }

  // On Submit Button being clicked, will organise data for DB push and push to DB   
  submitButtonAction(){
    // data prepped
    this.data = {
      tableNum: this.table, // set to QR route
      isPaid: false, 
      isServed: false, 
      foodOrder: [...this.foodSelection],
      drinkOrder: [...this.drinkSelection],
      timeOfOrder: Date(),
      bill: this.total
  }
    this.createNewOrders(this.data)
    alert("Order placed!")
    this.disableButton = true;
    console.log("I think we just sent an order to the kitchen!!")
  }

}

