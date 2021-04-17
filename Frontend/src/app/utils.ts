import { Injectable, Inject } from '@angular/core';
import { ReplaySubject, Observable, forkJoin } from 'rxjs';
import { DOCUMENT } from '@angular/common';

/**
 * Handled loading the external library ondemand into our app
 */
@Injectable({providedIn: 'root'})
export class ExternalLibraryService {

    private _loadedLibraries: { [url: string]: ReplaySubject<any> } = {};

    constructor(@Inject(DOCUMENT) private readonly document: any) {}

    // forkjoin parameters will grow when we are adding any new external library into app
    lazyLoadLibrary(resourceURL:any): Observable<any> {
        return forkJoin([
            this.loadScript(resourceURL)
        ]);
    }

    private loadScript(url: string): Observable<any> {
        if (this._loadedLibraries[url]) {
            return this._loadedLibraries[url].asObservable();
        }
    
        this._loadedLibraries[url] = new ReplaySubject();
    
        const script = this.document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = url;
        script.onload = () => {
            this._loadedLibraries[url].next();
            this._loadedLibraries[url].complete();
        };
    
        this.document.body.appendChild(script);    
        return this._loadedLibraries[url].asObservable();
    }    
}
