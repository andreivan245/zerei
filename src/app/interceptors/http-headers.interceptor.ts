import { HttpEvent,HttpHandler,HttpInterceptor,HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            setHeaders: {
                'X-RapidAPI-Key': '9551c5c54fmsh4daddd60bed9767p17c83djsn6e7565ba3169',
                'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com',
            },
            setParams: {
                key: 'eb1e3563a2674def80b22e4f396f2ad4',
            }
        });
        return next.handle(req);
    }
}