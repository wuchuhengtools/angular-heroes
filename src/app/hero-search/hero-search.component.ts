import { Component, OnInit } from '@angular/core';
import {HeroService} from '../hero.service';
import {Observable, Subject} from 'rxjs';
import {Hero} from '../hero';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss']
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;

  constructor(private heroeService: HeroService) {
  }

  private searchTerms = new Subject<string>();

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.heroeService.searchHeroes(term))
    );
  }

  public search(term: string): void
  {
    this.searchTerms.next(term);
  }

}
