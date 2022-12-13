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

  constructor(private charService: CharacterService, private router: Router) {
  }

  ngOnInit(): void {
    this.populateList();
  }

  populateList(): void {
    this.charService.getAllCharacters().subscribe((charRes: any) => {
      this.allCharacters = charRes.results;
      this.allCharacters.forEach((char, charIndex: number) => {
        char.films.forEach((film: string, filmIndex: number) => {
          this.charService.getMovie(film).subscribe((filmRes: any) => {
            this.allCharacters[charIndex].films[filmIndex] = filmRes.title;
          })
        })
      })
    });
  }

  navigateToSingleChar(name: any) {
    let singleChar = this.allCharacters.find(o => o.name === name);
    const navigationExtras: NavigationExtras = {state: singleChar};
    this.router.navigate(["character", name], navigationExtras);
  }
}
