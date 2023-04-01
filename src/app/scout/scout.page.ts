import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Template, DropdownField, DropdownItem } from '../models/template';
import { AppConfigService } from '../services/app-config.service';
import { Team } from '../models/teams';
import { ScoutInfo } from '../models/scoutInfo';
import { AlertController, Platform } from '@ionic/angular';
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

  private scout!: Scout;
  
  constructor(
    private route: ActivatedRoute,
    private alert: AlertController,
    private db: FRCDBService,
    private router: Router,
    private platform: Platform
  ) { }

  async ngOnInit() {
    // Get route params
    this.route.params.subscribe(params => {
      this.scoutType = params['type'];
      this._scoutId = params['id'];
    });

    if (this.scout === undefined)
      this.scout = {
        id: this._scoutId
      }

    this.scout.id = this._scoutId;
    this.scout = await this.db.getScout(this.scout);

    this.scoutInfo.matchKey = this.scout.matchKey ?? '';
    this.scoutInfo.scoutName = this.scout.scoutName ?? '';
    this.scoutInfo.teamKey = this.scout.teamKey ?? '';

    if (this.scout.data !== undefined)
      this.template = JSON.parse(this.scout.data);

    console.log(this.scout);

    this.platform.backButton.subscribeWithPriority(0, () => this.onCancel());
  }

  public async onDelete(): Promise<void> {
    const alert = await this.alert.create({
      header: 'Delete',
      message: 'Are you sure you want to Delete this scout?<br>You will not be able to recover the deleted scout!',
      buttons: [
        {
          text: 'Go Back',
          role: 'cancel',
        },
        {
          text: 'Confirm Delete',
          role: 'confirm',
          handler: () => {
            this.db.deleteScout(this.scout);
            this.router.navigate(['']);
          }
        }
      ]
    });

    await alert.present();
  }

  public async onCancel(): Promise<void> {
    const alert = await this.alert.create({
      header: 'Cancel',
      message: 'Are you sure you want to Cancel this scout?<br>All Changes made will be discarded.',
      buttons: [
        {
          text: 'Go Back',
          role: 'cancel',
        },
        {
          text: 'Confirm Cancel',
          role: 'confirm',
          handler: () => {
            this.router.navigate(['']);
          }
        }
      ]
    });

    await alert.present();
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

    this.scout = {
      id: this.scout.id,
      teamKey: this.scoutInfo.teamKey,
      eventKey: 'onham',
      matchKey: this.scoutInfo.matchKey,
      scoutName: this.scoutInfo.scoutName,
      data: JSON.stringify(this.template)
    }

    try {
      this.scout = await this.db.getScout(this.scout);
    } catch (e) {
      console.error(e);
    }

    console.log(this.template);
    console.log(this.scout);
    this.router.navigate([''])
  }

  public test() {
    console.log(this.template);
  }

}
