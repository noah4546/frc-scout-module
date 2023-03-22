import { Injectable } from '@angular/core';

import { SQLiteService } from './sqlite.service';
import { FRCDBService } from './frc-db.service';
import { AppConfigService } from './app-config.service';

@Injectable()
export class InitializeAppService {
  isAppInit: boolean = false;
  platform!: string;

  constructor(
    private sqliteService: SQLiteService,
    private db: FRCDBService,
    private appConfigService: AppConfigService
  ) {}

  public async initializeApp(): Promise<any> {
		await this.appConfigService.load();
		await this.appConfigService.loadTeams();

    await this.sqliteService.initializePlugin().then(async (ret) => {
      this.platform = this.sqliteService.platform;
      
      try {
        if (this.sqliteService.platform === 'web') {
          //await this.sqliteService.initWebStore();  
        }

        await this.db.initializeDatabase();
        await this.db.openDatabase();

        this.isAppInit = true;
      } catch (error) {
        console.log(`initializeAppError: ${error}`);
      }
    }); 
  }
}
