import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Template, DropdownField, DropdownItem } from '../models/template';
import { AppConfigService } from '../services/app-config.service';
import { Team } from '../models/teams';
import { ScoutInfo } from '../models/scoutInfo';
import { AlertController } from '@ionic/angular';
import { Scout } from '../models/DB';
import { FRCDBService } from '../services/frc-db.service';

@Component({
  selector: 'app-scout',
  templateUrl: './scout.page.html',
  styleUrls: ['./scout.page.scss'],
})
export class ScoutPage implements OnInit {

  public scoutType!: string;
  private _scoutId!: string;

  public scoutInfo: ScoutInfo = new ScoutInfo();
  public template: Template = { ...AppConfigService.settings.template};

  private scout: Scout = new Scout();
  
  constructor(
    private route: ActivatedRoute,
    private alert: AlertController,
    private db: FRCDBService
  ) { }

  async ngOnInit() {
    // Get route params
    this.route.params.subscribe(params => {
      this.scoutType = params['type'];
      this._scoutId = params['id'];    
      console.log(this._scoutId);
    });

    this.scout.id = this._scoutId;
    this.scout = await this.db.getScout(this.scout);
  }

  public onDelete(): void {
    console.log("onDelete");
  }

  public onCancel(): void {
    console.log("onCancel");
  }

  public async onSubmit(): Promise<void> {
    const isScoutValid = this.scoutInfo.isValid();

    if (!isScoutValid.valid) {
      const alert = await this.alert.create({
        header: 'Alert',
        message: isScoutValid.prompt ?? 'A requied field may be missing info!',
        buttons: [ 'OK' ]
      });

      await alert.present();
      return;
    }

    this.scout.scout_name = this.scoutInfo.studentName;
    this.scout.match_id = this.scoutInfo.matchKey;
    this.scout.team_key = this.scoutInfo.teamKey;
    this.scout.event_key = 'onham';
    this.scout.data = JSON.stringify(this.template);

    console.log(this.scout);
    this.scout = await this.db.getScout(this.scout);
  }

}
