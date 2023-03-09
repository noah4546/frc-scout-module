import { Component, OnInit } from '@angular/core';
import { TemplateSection } from '../../models/template';
import { AppConfigService } from '../../services/app-config.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent implements OnInit {

  public section: TemplateSection = AppConfigService.settings.template.sections[0];

  constructor() { }

  ngOnInit() {
    console.log(this.section)
  }

}
