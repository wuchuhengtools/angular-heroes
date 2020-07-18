import { Injectable } from '@angular/core';
import {Hero} from './hero';
import {HEROES} from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService} from './message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

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
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes',[]))
      );
  }

  public getHero(id: number): Observable<Hero>
  {
    const url = `${this.heroUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id = ${id}`)),
      catchError(this.handleError<Hero>(`getHero id = ${id}`)),
    );
  }

  public updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  public addHero(hero: Hero): Observable<Hero>
  {
    return this.http.post<Hero>(this.heroUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero id = ${newHero.id}`)),
      catchError(this.handleError<Hero>('add Hero'))
    );
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
