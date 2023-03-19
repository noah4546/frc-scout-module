import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonCheckbox } from '@ionic/angular';
import { CheckboxField } from 'src/app/models/template';

@Component({
  selector: 'app-checkbox-field',
  templateUrl: './checkbox-field.component.html',
  styleUrls: ['./checkbox-field.component.scss'],
})
export class CheckboxFieldComponent  implements AfterViewInit {

  @Input() public field!: CheckboxField;
  @Output() fieldChange = new EventEmitter<CheckboxField>();

  @ViewChild('ionCheckboxEl') input!: IonCheckbox;

  public value: boolean = false;

  constructor() { }

  ngAfterViewInit() {
    if (this.field.value !== undefined && typeof this.field.value === "boolean")
      this.value = this.field.value;

    this.update();
  }

  public onChange(e: any): void {
    this.value = e.target!.checked ?? false;
    this.update();
  }

  public update(): void {
    this.input.checked = this.value;
    this.field.value = this.value;
    this.fieldChange.emit(this.field);
  }

}
