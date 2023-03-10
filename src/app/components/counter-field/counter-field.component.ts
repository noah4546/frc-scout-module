import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CounterField } from 'src/app/models/template';

@Component({
  selector: 'app-counter-field',
  templateUrl: './counter-field.component.html',
  styleUrls: ['./counter-field.component.scss'],
})
export class CounterFieldComponent  implements OnInit {

  @Input() public field!: CounterField;
  @Output() fieldChange = new EventEmitter<CounterField>();

  public value: number = 0;

  constructor() { }

  ngOnInit() {
    if (this.field.value === undefined) {
      this.field.value = 0;
      this.value = 0;

      this.fieldChange.emit(this.field);
    }

    if (this.field.min !== undefined) {
      this.field.value = this.field.min;
      this.value = this.field.min;

      this.fieldChange.emit(this.field);
    }
  }

  public onAdd() {
    if (!(this.field.max !== undefined && this.value >= this.field.max))
      this.value++;

    this.fieldChange.emit(this.field);
  }

  public onRemove() {
    if (!(this.field.min !== undefined && this.value <= this.field.min))
      this.value--;

      this.fieldChange.emit(this.field);
  }

}
