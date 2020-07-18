import { Injectable } from '@angular/core';
import {Hero} from './hero';
import {HEROES} from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService} from './message.service';
import { HttpClient} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroUrl = 'api/heroes';

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) { }

  public getHeroes(): Observable<Hero[]>
  {
    this.messageService.add('HeroService: fetched heroes');
    return this.http.get<Hero[]>(this.heroUrl)
      .pipe(
        catchError(this.handleError<Hero[]>('getHeroes',[]))
      );
  }

  public getHero(id: number): Observable<Hero>
  {
    this.messageService.add(`HeroService: fetched hero id = ${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }

  private log(message: string): void
  {
    this.messageService.add(`HeroService: ${message}`);
  }

  private handleError<T>(operateion = 'operation', result?: T )
  {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operateion} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
