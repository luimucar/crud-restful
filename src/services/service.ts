import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class Service {

    DEBUG : boolean = false;
    private header: RequestOptions;
    private body: any;


    constructor(private http: Http) {
        // Check if is DEBUG
        if (this.DEBUG) {
            this.setHeader(null, false);
        } else {
            let header = { 'Content-Type': 'application/json' };
            this.setHeader(header, true);
        }

        this.body = '';
    }

    public get(url: string, json: boolean = true): any {

        return this.http.get(url, this.getHeader)
            .map((res: Response) => {
                if (json) {
                    return res.json();
                } else {
                    return res;
                }
            })
            .catch((error: any) => {

                let errorAll = error.json().errorMessage;
                let errorFields = error.json().fields[0];
                if(errorFields != null) {
                    errorAll = errorAll + "<br><br>" + errorFields;
                }

                return Observable.throw(error || 'Server error')
            });
    }

    public post(url: string, json: boolean = true): any {

        return this.http.post(url, this.getBody, this.getHeader)
            .map((res: Response) => {
                // Get Response
                if (json) {
                    return res.json();
                } else {
                    return res;
                }
            })
            .catch((error: any) => {
                //this.login.tokenCheck(error.json().error);

                // Show mensage error
                let errorAll = error.json().errorMessage;
                let errorFields = error.json().fields[0];
                if(errorFields != null) {
                    errorAll = errorAll + "<br><br>" + errorFields;
                }

                return Observable.throw(error || 'Server error')
            });
    }

    public put(url: string, json: boolean = true): any {

        return this.http.put(url, this.getBody, this.getHeader)
            .map((res: Response) => {
                // Get Response
                if (json) {
                    return res.json();
                } else {
                    return res;
                }
            })
            .catch((error: any) => {
                //this.login.tokenCheck(error.json().error);

                // Show mensage error
                let errorAll = error.json().errorMessage;
                let errorFields = error.json().fields[0];
                if(errorFields != null) {
                    errorAll = errorAll + "<br><br>" + errorFields;
                }

                return Observable.throw(error || 'Server error')
            });
    }

    public delete(url: string, json: boolean = true): any {

        return this.http.delete(url, this.getHeader)
            .map((res: Response) => {
                // Get Response
                if (json) {
                    return res.json();
                } else {
                    return res;
                }
            })
            .catch((error: any) => {
                //this.login.tokenCheck(error.json().error);

                // Show mensage error
                let errorAll = error.json().errorMessage;
                let errorFields = error.json().fields[0];
                if(errorFields != null) {
                    errorAll = errorAll + "<br><br>" + errorFields;
                }

                return Observable.throw(error || 'Server error')
            });
    }

    public setHeader(header: any = null, authorization: boolean = true): void {
        // Set Authorization
        if (authorization) {
            header.Authorization = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
        }

        let headers = new Headers(header);
        this.header = new RequestOptions({ headers: headers });
    }

    public get getHeader(): RequestOptions {
        return this.header;
    }


    public setBody(body): void {
        this.body = JSON.stringify(body);
    }

    public get getBody(): any {
        return this.body;
    }

}