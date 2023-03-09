import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scout-list',
  templateUrl: './scout-list.page.html',
  styleUrls: ['./scout-list.page.scss'],
})
export class ScoutListPage implements OnInit {

  public eventName: string = "McMaster";
  public scoutType: string = "Match";

  constructor() { }

  ngOnInit() {
  }

  public onAddClicked() {
    console.log("onAddClicked");
  }

}
