import { Injectable, NgModule } from '@angular/core';
import { AppComponent } from '../app.component';
import { BrowserModule } from '@angular/platform-browser';
import { Http, Response, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { SearchResult } from './search-result';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpModule
    ],
    providers: [
        YoutubeService
    ],
    bootstrap: [
        AppComponent
    ]
})

@Injectable()
export class YoutubeService {

    private apiKey = 'AIzaSyDxugcveCG_gLvxIAvS01jGE8QV6rdw4U4';
    private apiUrl = 'https://www.googleapis.com/youtube/v3/search';

    constructor(private http: Http) { };

    search(query: string) {
        const params: string = [
            `q=${query}`,
            `key=${this.apiKey}`,
            `part=snippet`,
            `type=video`,
            `maxResults=10`
        ].join('&');

        const queryUrl = `${this.apiUrl}?${params}`;
        return this.http.get(queryUrl)
            .map((response: Response) => {
                return (<any>response.json()).items.map(item => {
                    return new SearchResult({
                        id: item.id.videoId,
                        title: item.snippet.title,
                        description: item.snippet.description, thumbnailUrl: item.snippet.thumbnails.high.url
                    });
                });
            });

    }
}
