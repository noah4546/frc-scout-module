import { Injectable } from "@angular/core";
import { FRCDBService } from './frc-db.service';
import { ScoutApiService } from "../features/api/services/scout.api.service";
import { Scout } from '../models/DB';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SyncService {

    constructor(
        private db: FRCDBService,
        private api: ScoutApiService,
        private http: HttpClient
    ) {

    }

    public async sync(): Promise<void> {
        await this.db.getAllData();
        await this.syncScouts();
    }

    private async syncScouts(): Promise<void> {
        await this.uploadScouts();
        //await this.downloadScouts();
    }

    private uploadScouts(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.db.scoutsState().subscribe(res => {
                if (res) {
                    this.db.fetchScouts().subscribe(data => {
                        this.api.addScouts(data).subscribe({
                            next: () => resolve(true),
                            error: e => reject(e)
                        })
                    });
                } else {
                    reject("No Data in DB");
                }
            })
        })
    }

    private downloadScouts(): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            this.api.getScouts().subscribe(async data => {
                if (data && data.length) {
                    
                    for (let i = 0; i < data.length; i++)
                        await this.db.getScout(data[i]);

                } else {
                    reject("No Data from Server");
                }
            })
        })
    }

}