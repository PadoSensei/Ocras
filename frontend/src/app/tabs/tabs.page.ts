import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private route: ActivatedRoute) {}
  
  pewpew;
  ngOnInit() {
    let url = window.location.href;
    let urlLast = url[url.length -1]
    this.pewpew = urlLast
    console.log("PEWEPWEPWEPWEPWEPW", this.pewpew);
  }
  test = () => {
    // this.pewpew = this.route.routerState.snapshot.url
    console.log('local', this.pewpew)
    console.log('far', this.route.snapshot.paramMap)
  }
 

}
