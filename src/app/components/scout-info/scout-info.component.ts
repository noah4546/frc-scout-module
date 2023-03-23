import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ScoutInfo } from '../../models/scoutInfo';
import { DropdownItem, TextField } from 'src/app/models/template';
import { NumberField, DropdownField } from '../../models/template';
import { Team } from 'src/app/models/teams';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-scout-info',
  templateUrl: './scout-info.component.html',
  styleUrls: ['./scout-info.component.scss'],
})
export class ScoutInfoComponent  implements OnInit {

  @Input() public scoutInfo!: ScoutInfo;
  @Output() scoutInfoChange = new EventEmitter<ScoutInfo>();

  public studentName: TextField = {
    type: 'Text',
    label: 'Student Name'
  };

  public matchNumber: NumberField = {
    type: 'Number',
    label: 'Match Number',
    min: 0,
    max: 100
  };

  public team: DropdownField = {
    type: 'Dropdown',
    label: 'Team'
  }

  constructor() { 
    if (this.scoutInfo === undefined)
      this.scoutInfo = new ScoutInfo();
  }

  ngOnInit() {
    // Add items to dropdown
    let teams: Team[] = AppConfigService.teams;

    if (this.team.items === undefined)
      this.team.items = [];

    for (let i = 0; i < Object.keys(teams).length; i++) {
      const team = teams[i];

      const item: DropdownItem = {
        text: `${team.team_number} - ${team.nickname ?? team.name}`,
        value: team.key
      };

      this.team.items.push(item);
    } 

    this.onChange();
  }

  public onChange() {
    this.scoutInfo.studentName = (this.studentName.value ?? '').toString();
    this.scoutInfo.matchKey = (this.matchNumber.value ?? '').toString();
    this.scoutInfo.teamKey = (this.team.value ?? '').toString();

    this.scoutInfoChange.emit(this.scoutInfo);
  }

}
