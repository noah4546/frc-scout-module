import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-scout-list',
  templateUrl: './scout-list.page.html',
  styleUrls: ['./scout-list.page.scss'],
})
export class ScoutListPage implements OnInit {

  public eventName: string = "McMaster";
  public scoutType: string = "match";

  constructor(
    private _router: Router
  ) { }

  ngOnInit() {
  }

  public onAddClicked() {
    const uuid = uuidv4();
    this._router.navigate(['scout', this.scoutType, uuid ])
  }

}
