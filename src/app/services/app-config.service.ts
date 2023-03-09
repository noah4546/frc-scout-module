import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Team } from "../models/teams";
import { Template } from '../models/template';

@Injectable()
export class AppConfigService {

  public static settings: IAppConfig;
  public static teams: Team[];

  constructor(
    private http: HttpClient
  ) { }

  public async load(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.http.get<IAppConfig>(jsonFile).subscribe((data: IAppConfig) => {
        AppConfigService.settings = { ...data };
        resolve();
      }, (error: any) => {
        console.error(error);
        reject();
      });
    });
  }

  public async loadTeams(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.http.get<Team[]>(teamsFile).subscribe((data: Team[]) => {
        AppConfigService.teams = { ...data };
        resolve();
      }, (error: any) => {
        console.error(error);
        reject();
      });
    });
  }

}

const jsonFile = 'assets/appConfig.json';
const teamsFile = 'assets/teams.json';

export interface IAppConfig {
  template: Template
}
