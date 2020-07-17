import { Injectable } from '@angular/core';
import {Hero} from './hero';
import {HEROES} from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService} from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  public getHeroes(): Observable<Hero[]>
  {
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }

  public getHero(id: number): Observable<Hero>
  {
    this.messageService.add(`HeroService: fetched hero id = ${id}`);
    return of(HEROES.find(hero => hero.id === id));
    // const index = HEROES.findIndex( el => el.id === id);
    // return of(HEROES[index]);
  }
}
