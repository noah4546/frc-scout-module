import { Injectable } from '@angular/core';
import { SQLiteService } from './sqlite.service';
import { DbnameVersionService } from './dbname-version.service';
import { scoutsVersionUpgrades } from '../../upgrades/scouts-upgrade';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { BehaviorSubject } from 'rxjs';
import { Scout } from '../models/DB';
import { environment } from 'src/environments/environment';

@Injectable()
export class FRCDBService {
  
	public databaseName!: string;
	public scoutsList: BehaviorSubject<Scout[]> = new BehaviorSubject<Scout[]>([]);

	private isScoutsReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

	private versionUpgrades = scoutsVersionUpgrades;
	private loadToVersion = scoutsVersionUpgrades[scoutsVersionUpgrades.length - 1].toVersion;
	private mDb!: SQLiteDBConnection;

	constructor(
		private sqlite: SQLiteService,
		private dbVerService: DbnameVersionService
	) {
		this.databaseName = environment.dbName;
	}

	async initializeDatabase() {
		await this.sqlite.addUpgradeStatement({
			database: this.databaseName,
			upgrade: this.versionUpgrades
		})

		await this.openDatabase();
		this.dbVerService.set(this.databaseName, this.loadToVersion);

		if (this.sqlite.platform === 'web')
			await this.sqlite.sqliteConnection.saveToStore(this.databaseName);

		await this.getAllData();
	}

	async openDatabase() {
		if (
			this.sqlite.native 
			&& (await this.sqlite.isInConfigEncryption()).result
			&& (await this.sqlite.isDatabaseEncrypted(this.databaseName)).result
		) {
			this.mDb = await this.sqlite.openDatabase(
				this.databaseName,
				true,
				'secret',
				this.loadToVersion,
				false
			);
		} else {
			this.mDb = await this.sqlite.openDatabase(
				this.databaseName,
				false,
				'no-encryption',
				this.loadToVersion,
				false
			);
		}
	}

	async getAllData() {
		await this.getAllScouts();
		this.isScoutsReady.next(true);
	}

	scoutsState() {
		return this.isScoutsReady.asObservable();
	}

	fetchScouts() {
		return this.scoutsList.asObservable();
	}

	async getAllScouts() {
		const scouts: Scout[] = (await this.mDb.query('SELECT * FROM scouts')).values as Scout[];
		this.scoutsList.next(scouts);
	}

	async getScout(inScout: Scout): Promise<Scout> {
		let scout: Scout = await this.sqlite.findOneBy(this.mDb, 'scouts', { id: `'${inScout.id}'` });

		if (!scout) {
			scout = {
				id: inScout.id,
				teamKey: inScout.teamKey,
				eventKey: inScout.eventKey,
				matchKey: inScout.matchKey,
				scoutName: inScout.scoutName, 
				data: inScout.data
			}

			try {
				await this.sqlite.save(this.mDb, 'scouts', scout);
				scout = await this.sqlite.findOneBy(this.mDb, 'scouts', { id: `'${inScout.id}'` });
	
				if (scout)
					return scout;
				else
					return Promise.reject(`Failed to get scout for id ${inScout.id}`);
			} catch (e) {
				console.log(`Fail Scout: ${e}`)
				return scout;
			}

		} else {
			if (Object.keys(inScout).length > 1) {
				const updScout: Scout = {
					id: inScout.id,
					teamKey: inScout.teamKey,
					eventKey: inScout.eventKey,
					matchKey: inScout.matchKey,
					scoutName: inScout.scoutName, 
					data: inScout.data
				}

				await this.sqlite.save(this.mDb, 'scouts', updScout, { id: `'${inScout.id}'` });
				scout = await this.sqlite.findOneBy(this.mDb, 'scouts', { id: `'${inScout.id}'` });

				if (scout)
					return scout;
				else
					return Promise.reject(`Failed to get scout for id ${inScout.id}`);

			} else {
				return scout;
			}
		}
	}

	async deleteScout(inScout: Scout): Promise<void> {
		let scout = await this.sqlite.findOneBy(this.mDb, 'scouts', { id: `'${inScout.id}'` });

		if (scout)
			await this.sqlite.remove(this.mDb, 'scouts', { id: `'${inScout.id}'` });
		
		return;
	}

}
