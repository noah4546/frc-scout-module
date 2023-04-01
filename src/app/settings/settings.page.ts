import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScoutApiService } from '../features/api/services/scout.api.service';
import { Scout } from '../models/DB';
import { SyncService } from '../services/sync.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(
    private router: Router,
    private sync: SyncService
  ) { }

  ngOnInit() {

  }

  public async onSync(): Promise<void> {
    this.sync.sync();
  }

  public onBack(): void {
    this.router.navigate(['']);
  }

}
