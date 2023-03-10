import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Template, DropdownField, DropdownItem } from '../models/template';
import { AppConfigService } from '../services/app-config.service';
import { Team } from '../models/teams';

@Component({
  selector: 'app-scout',
  templateUrl: './scout.page.html',
  styleUrls: ['./scout.page.scss'],
})
export class ScoutPage implements OnInit {

  public scoutType: string | null = null;
  private _scoutId: string | null = null;

  public template: Template = AppConfigService.settings.template;
  
  constructor(
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    // Get route params
    this._route.params.subscribe(params => {
      this.scoutType = params['type'];
      this._scoutId = params['id'];    
      console.log(this._scoutId);
    });

    // Add items to dropdown
    let teams: Team[] = AppConfigService.teams;
    let dropdown = this.template.sections[0].fields[2] as DropdownField;

    if (dropdown.items === undefined)
      dropdown.items = [];

    for (let i = 0; i < Object.keys(teams).length; i++) {
      const team = teams[i];

      const item: DropdownItem = {
        text: `${team.team_number} - ${team.nickname ?? team.name}`,
        value: team.key
      };

      dropdown.items.push(item);
    }  
  }

}
