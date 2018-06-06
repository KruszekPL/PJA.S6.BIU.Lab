import { Component, OnInit, EventEmitter, Output, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switch';


import { SearchResult } from 'app/youtube/search-result';
import { YoutubeService } from 'app/youtube/youtube.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})

export class SearchBoxComponent implements OnInit {
  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() results: EventEmitter<SearchResult[]> = new EventEmitter<SearchResult[]>();

  constructor(private youtube: YoutubeService, private el: ElementRef) { }

  ngOnInit() {
    Observable.fromEvent(this.el.nativeElement, 'keyup')
      .map((e: any) => e.target.value)
      .filter((text: string) => text.length > 1).debounceTime(250)
      .do(() => this.loading.emit(true))
      .map((query: string) => this.youtube.search(query)).switch()
      .subscribe((results: SearchResult[]) => {
        this.loading.emit(false); this.results.emit(results)
      }, (err) => {
        console.log(err); this.loading.emit(false);
      },
        () => this.loading.emit(false));
  }
}
