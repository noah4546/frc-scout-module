import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TemplateSection } from '../../models/template';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent implements OnInit {

  @Input() public section!: TemplateSection;
  @Output() sectionChange = new EventEmitter<TemplateSection>();

  constructor() { }

  ngOnInit() {
    //console.log(this.section)
  }

}
