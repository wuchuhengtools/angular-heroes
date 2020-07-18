import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HEROES} from '../mock-heroes';
import { HeroService} from '../hero.service';
import {MessageService} from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  hero: Hero = {
    id: 1,
    name: 'Winstorm'
  };

  heroes: Hero[];

  constructor(private heroService: HeroService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  private getHeroes(): void
  {
    this.heroService.getHeroes().subscribe(heros => this.heroes = heros);
  }

  public add(name: string): void
  {
    if (name.trim().length === 0) {
      return ;
    }
    this.heroService.addHero({ name } as Hero).subscribe( hero => this.heroes.push(hero));
  }
}
