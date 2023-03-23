import { Component, OnInit, AfterViewInit, AfterViewChecked, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {v4 as uuidv4} from 'uuid';
import { FRCDBService } from '../services/frc-db.service';
import { Scout } from '../models/DB';
import { filter } from 'rxjs';

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
    this.getScouts();

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd && event.url === '/'))
      .subscribe(() => {
        this.getScouts();
      })
  }

  public onAddClicked() {
    const uuid = uuidv4();
    this.router.navigate(['scout', this.scoutType, uuid ]);
  }

  public async getScouts() {

    await this.db.getAllData();

    try {
      this.db.scoutsState().subscribe(res => {
        if (res)
          this.db.fetchScouts().subscribe(data => {
            this.scoutsList = data;
            console.log(data);
          });
      });
    } catch (e) {
      throw new Error(`Error: ${e}`);
    }
  }

  public async test() {
    this.db.getScout({
      id: 'aaabbbccc',
      team_key: 'aaa',
      event_key: 'test',
      match_id: 'test',
      scout_name: 'test',
      data: 'hello'
    })
    this.getScouts();
  }

  public onSettings(): void {
    this.router.navigate(['/settings']);
  }

}
