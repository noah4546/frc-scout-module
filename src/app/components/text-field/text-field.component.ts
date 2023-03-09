import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TextField } from 'src/app/models/template';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
})
export class TextFieldComponent  implements OnInit {

  @Input() public field!: TextField;
  @Output() fieldChange = new EventEmitter<TextField>();

  constructor() { }

  ngOnInit() {}

}
