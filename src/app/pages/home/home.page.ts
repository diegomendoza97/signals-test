import { Component, inject, signal } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import CharactersService from '../../services/characters.service';
import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { BehaviorSubject, debounceTime, switchMap, tap } from 'rxjs';
import CharacterCardComponent from '../../components/character-card.component';
import { fromObservable } from '../../utils/form-observable';

@Component({
  standalone: true,
  imports: [
    IonicModule,
    AsyncPipe,
    JsonPipe,
    NgIf,
    NgFor,
    CharacterCardComponent,
  ],
  selector: 'signals-home',
  templateUrl: './home.page.html',
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export default class HomePage {
  isLoading = signal(true);
  searchQuery = new BehaviorSubject('');
  charactersService = inject(CharactersService);
  characters = fromObservable(
      this.searchQuery.pipe(
          debounceTime(200),
          tap(() => this.isLoading.set(true)),
          switchMap((query: string) => this.charactersService.getCharacters(query)),
          tap(() => this.isLoading.set(false))
      ),
      []
  );
}
