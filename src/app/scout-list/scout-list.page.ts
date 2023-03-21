import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {v4 as uuidv4} from 'uuid';
import { FRCDBService } from '../services/frc-db.service';
import { Scout } from '../models/DB';

@Component({
  selector: 'app-scout-list',
  templateUrl: './scout-list.page.html',
  styleUrls: ['./scout-list.page.scss'],
})
export class ScoutListPage implements OnInit {

  public eventName: string = "McMaster";
  public scoutType: string = "match";

  public scoutsList: Scout[] = [];

  constructor(
    private router: Router,
    private db: FRCDBService
  ) { }

  async ngOnInit() {
    try {
      this.db.scoutsState().subscribe(res => {
        if (res)
          this.db.fetchScouts().subscribe(data => {
            this.scoutsList = data;
          });
      });
    } catch (e) {
      throw new Error(`Error: ${e}`);
    }
  }

  public onAddClicked() {
    const uuid = uuidv4();
    this.router.navigate(['scout', this.scoutType, uuid ])
  }

}
