import { Injectable } from "@angular/core";
import { BaseApiService } from './base.api.service';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Scout } from "src/app/models/DB";
import { Observable, map, filter } from 'rxjs';
import { StrictHttpResponse } from "../strict-http-response";

@Injectable({
    providedIn: 'root'
})
class ScoutApiService extends BaseApiService {

    constructor(http: HttpClient) {
        super(http);
    }

    private getScoutsResponse(): Observable<StrictHttpResponse<Array<Scout>>> {
        let __params = this.newParams();
        let __headers = new HttpHeaders();
        let __body: any = null;

        let req = new HttpRequest<any>(
        'GET',
        this.rootUrl + `/scouts`,
        __body,
        {
            headers: __headers,
            params: __params,
            responseType: 'json'
        }
        );

        return this.http.request<any>(req).pipe(
            // @ts-ignore
            filter(_r => _r instanceof HttpResponse),
            map((_r: HttpResponse<any>) => {
                return _r as StrictHttpResponse<Array<Scout>>;
            })
        );
    }

    public getScouts(): Observable<Array<Scout>> {
        return this.getScoutsResponse().pipe(
            map(_r => _r.body)
        );
    }

    private addScoutsResponse(scouts: Scout[]): Observable<StrictHttpResponse<void>> {
        let __params = this.newParams();
        let __headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let __body: any = JSON.stringify(scouts);

        let req = new HttpRequest<any>(
        'POST',
        this.rootUrl + `/scouts`,
        __body,
        {
            headers: __headers,
            params: __params,
            responseType: 'json'
        }
        );

        return this.http.request<any>(req).pipe(
            // @ts-ignore
            filter(_r => _r instanceof HttpResponse),
            map((_r: HttpResponse<any>) => {
                return _r as StrictHttpResponse<void>;
            })
        );
    }

    public addScouts(scouts: Scout[]): Observable<void> {
        return this.addScoutsResponse(scouts).pipe(
            map(_r => _r.body)
        );
    }

} export { ScoutApiService }