import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DropdownField } from '../../models/template';

@Component({
  selector: 'app-dropdown-field',
  templateUrl: './dropdown-field.component.html',
  styleUrls: ['./dropdown-field.component.scss'],
})
export class DropdownFieldComponent  implements OnInit {

  @Input() public field!: DropdownField;
  @Output() fieldChange = new EventEmitter<DropdownField>();

  public customActionSheetOptions!: any;

  constructor() { }

  ngOnInit() {
    this.customActionSheetOptions = {
      header: this.field.label
    }
  }

}
