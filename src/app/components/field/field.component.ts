import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DropdownField, Field, NumberField, TextField } from 'src/app/models/template';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss'],
})
export class FieldComponent  implements OnInit {

  @Input() public field!: Field | TextField | NumberField | DropdownField;
  @Output() fieldChange = new EventEmitter<Field | TextField | NumberField | DropdownField>();

  public type!: string;

  constructor() { }

  ngOnInit() {
    this.type = this.field.type;
  }

}
