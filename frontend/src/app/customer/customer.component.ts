import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from '../crud.service'

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

  
  pewpew: string;

  ngOnInit() {
    let backgr = document.querySelector('#background-content')
    //console.log(backgr);
    this.getMenu();
    this.pewpew = this.route.snapshot.paramMap.get('pewpew');

  }
  name;
  address;
  total = 0;
  foodItems = [];
  drinkItems = [];
  selectedItems = [];
  menuItems = [];

  data = {
  tableNum: this.pewpew,
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
      // Adds menu item names to respective arrays
     this.createSimpleDrinkArray();
     this.createSimpleFoodArray();
    })
  }
  
  createNewOrders(data): void {
    const orders = this.crudService.createNewOrder(data);
    
  }


  addItem = (item) => {
    // console.log('event', item);
    // console.log('item', this.test);
  }

  handleClick(event): void {

    const selectedItemName = event.currentTarget.childNodes[0].childNodes[0].textContent
    const selectedItemPrice = event.currentTarget.childNodes[1].childNodes[0].textContent
    
    //this.selectedItems.push(event.currentTarget.childNodes[0].childNodes[0].innerHTML);
    // Push selected to either drinks or food array. SENDITEM
    
    this.sendItem(selectedItemName)
    // Push selected price to price array
    this.pricesOfSelected.push(selectedItemPrice)
    event.currentTarget.style.backgroundColor = '#abcdeb';
    event.currentTarget.style.transform = `rotate(${Math.floor(Math.random() * (4 - -4) + -4)}deg) translateX(-15%)`;
    let clicked = event.currentTarget.childNodes[0].childNodes[0].textContent;
    this.selectedItems.push(clicked);
    event.currentTarget.style.backgroundColor = '#abcdeb';
    event.currentTarget.style.transform = `rotate(${Math.floor(Math.random() * (4 - -4) + -4)}deg) translateX(-4vw)`;
    this.total += Number(event.currentTarget.childNodes[1].childNodes[0].textContent.slice(1,4))
    
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
      tableNum: 7, // set to QR route
          isPaid: false, 
          isServed: false, 
          foodOrder: [...this.foodSelection],
          drinkOrder: [...this.drinkSelection],
          timeOfOrder: Date(),
          bill: this.total
      }
    this.createNewOrders(this.data)
    console.log("I think we just sent an order to the kitchen!!")
  }

}

