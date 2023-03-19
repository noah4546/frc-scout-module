import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DropdownField } from '../../models/template';
import { IonSelect } from '@ionic/angular';

@Component({
  selector: 'app-dropdown-field',
  templateUrl: './dropdown-field.component.html',
  styleUrls: ['./dropdown-field.component.scss'],
})
export class DropdownFieldComponent implements AfterViewInit, OnInit {

  @Input() public field!: DropdownField;
  @Output() fieldChange = new EventEmitter<DropdownField>();

  @ViewChild('ionSelectEl') select!: ElementRef<IonSelect>;

  public customActionSheetOptions!: any;
  public value: string | undefined;

  constructor() { }

  ngOnInit(): void {
    this.customActionSheetOptions = {
      header: this.field.label
    }
  }

  ngAfterViewInit() {
    if (this.field.value !== undefined && typeof this.field.value === "string") {
      this.value = this.field.value;
    }   

    this.update();
  }

  public onChange(e: any): void {
    this.value = e.detail.value;
    console.log(this.value);
    this.update();
  }

  public update(): void {
    this.field.value = this.value;
    this.fieldChange.emit(this.field);
  }

}
