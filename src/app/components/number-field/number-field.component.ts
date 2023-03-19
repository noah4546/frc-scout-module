import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { NumberField } from 'src/app/models/template';

@Component({
  selector: 'app-number-field',
  templateUrl: './number-field.component.html',
  styleUrls: ['./number-field.component.scss'],
})
export class NumberFieldComponent  implements OnInit {

  @Input() public field!: NumberField;
  @Output() fieldChange = new EventEmitter<NumberField>();

  @ViewChild('ionInputEl') input!: IonInput;

  public value: number = -1;

  constructor() { }

  ngOnInit() {
    if (this.field.value !== undefined && typeof this.field.value === "number")
      this.value = this.field.value;
    else if (this.field.min !== undefined)
      this.value = this.field.min;
    
    this.update();
  }

  public onInput(e: any): void {
    let value = e.target!.value;
    
    if (this.field.max !== undefined && value > this.field.max)
      value = this.field.max;

    if (this.field.min !== undefined && value < this.field.min)
      value = this.field.min;

    this.value = value;
    this.update();
  }

  public onFocusOut(): void {
    this.update();
  }

  public update(): void {
    this.field.value = this.value;
    this.fieldChange.emit(this.field);
  }

}
