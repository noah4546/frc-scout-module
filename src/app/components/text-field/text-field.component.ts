import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonTextarea } from '@ionic/angular';
import { TextField } from 'src/app/models/template';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
})
export class TextFieldComponent  implements OnInit {

  @Input() public field!: TextField;
  @Output() fieldChange = new EventEmitter<TextField>();

  @ViewChild('textArea') textArea!: ElementRef<IonTextarea>;
  
  public value: string = "";

  constructor() { }

  ngOnInit() {
    if (this.field.value !== undefined && typeof this.field.value === "string")
      this.value = this.field.value;

    this.update();
  }

  public onInput(e: any): void {
    this.value = e.target!.value;
    this.update();
  }

  public update(): void {
    this.field.value = this.value;
    this.fieldChange.emit(this.field);
  }

}
