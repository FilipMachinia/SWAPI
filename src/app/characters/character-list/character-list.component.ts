import {Component, OnInit} from '@angular/core';
import {CharacterService} from "../character.service";
import {NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {

  allCharacters: any[] = [];
  charactersToShow = 3;
  allMovies: any[] = [];
  requestReturned = 0;

  constructor(private charService: CharacterService, private router: Router) {}

  ngOnInit(): void {
    this.populateList();
  }

  populateList(): void {
    this.charService.getAllCharacters().subscribe((charRes: any) => {
      this.allCharacters = charRes.results;
      this.allCharacters.forEach((char) => {
        this.createMovieIndex(char);
      });

      this.allMovies.forEach((film: any) => {
        this.charService.getMovie(film.filmUrl).subscribe((filmRes: any) => {

          this.allMovies.find((movie: any, i: number) => {
            if (movie.filmUrl === filmRes.url) {
              this.allMovies[i].title = filmRes.title;
              this.requestReturned++;

              if (this.requestReturned === 6) {
                this.updateMovieTitles();
              }
              return true; // stop searching
            }
          });
        });
      });
    });
  }

  // set up an array of movies
  createMovieIndex(char: any): void {
    char.films.forEach((film: any) => {
      const movieAlreadyInArray = this.allMovies.find(o => o.filmUrl === film);
      if (!movieAlreadyInArray) {
        this.allMovies.push({filmUrl: film, index: film.substring(film.length - 2, film.length - 1)});
      }
    })
  }

  // change movie list from api links to proper titles
  updateMovieTitles(): void {
    this.allCharacters.forEach((char, charIndex: number) => {
      char.films.forEach((film: any, filmIndex: number) => {
        this.allMovies.find((movie: any, i: number) => {
          if (movie.filmUrl === film) {
            this.allCharacters[charIndex].films[filmIndex] = this.allMovies[i];
          }
        });
      })
    });
  }

  // go to single character page, send char data
  navigateToSingleChar(name: any) {
    let singleChar = this.allCharacters.find(o => o.name === name);
    const navigationExtras: NavigationExtras = {state: singleChar};
    this.router.navigate(["character", name], navigationExtras);
  }

}
