import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Location} from '@angular/common';

@Component({
  selector: 'app-single-character',
  templateUrl: './single-character.component.html',
  styleUrls: ['./single-character.component.scss']
})
export class SingleCharacterComponent implements OnInit {

  character: any = '';
  imgUrl: string = ''

  constructor(private router: Router, private location: Location) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { name: string };
    this.character = state;
    this.imgUrl = `assets/avatars/${state.name}.png`;
  }

  ngOnInit(): void {
  }

  goBack() {
    this.location.back();
  }
}
