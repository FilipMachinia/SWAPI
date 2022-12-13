import {RouterModule, Routes} from "@angular/router";
import {CharacterListComponent} from "./characters/character-list/character-list.component";
import {SingleCharacterComponent} from "./characters/single-character/single-character.component";
import {NgModule} from "@angular/core";

const routes: Routes = [
  {path: '', component: CharacterListComponent},
  {path: 'character/:name', component: SingleCharacterComponent},
  ]

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
