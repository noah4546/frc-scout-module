import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScoutPageRoutingModule } from './scout-routing.module';

import { ScoutPage } from './scout.page';
import { SectionComponent } from '../components/section/section.component';
import { FieldComponent } from '../components/field/field.component';
import { TextFieldComponent } from '../components/text-field/text-field.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScoutPageRoutingModule,
  ],
  declarations: [
    ScoutPage,
    SectionComponent,
    FieldComponent,
    TextFieldComponent
  ]
})
export class ScoutPageModule {}
