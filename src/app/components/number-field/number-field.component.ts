import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NumberField } from 'src/app/models/template';

@Component({
  selector: 'app-number-field',
  templateUrl: './number-field.component.html',
  styleUrls: ['./number-field.component.scss'],
})
export class NumberFieldComponent  implements OnInit {

  @Input() public field!: NumberField;
  @Output() fieldChange = new EventEmitter<NumberField>();

  constructor() { }

  ngOnInit() {}

}
