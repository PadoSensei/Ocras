import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Tab3Page } from './tab3.page';
import { Tab3PageRoutingModule } from './tab3-routing.module'
import { MgmtComponent } from '../mgmt/mgmt.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab3Page }]),
    Tab3PageRoutingModule,
  ],
  entryComponents: [MgmtComponent],
  declarations: [Tab3Page, MgmtComponent]
})
export class Tab3PageModule {}
