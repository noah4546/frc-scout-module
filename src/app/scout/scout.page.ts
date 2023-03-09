import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-scout',
  templateUrl: './scout.page.html',
  styleUrls: ['./scout.page.scss'],
})
export class ScoutPage implements OnInit {

  public scoutType: string | null = null;
  private _scoutId: string | null = null;
  
  constructor(
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.scoutType = params['type'];
      this._scoutId = params['id'];    
      console.log(this._scoutId);
    })
  }

}
