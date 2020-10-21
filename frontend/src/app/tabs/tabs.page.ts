import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  constructor(private route: ActivatedRoute) {}
  
  pewpew;
  ngOnInit() {
    this.pewpew = this.route.snapshot.paramMap.get('pewpew')
    console.log('????', this.pewpew)
  }

}
