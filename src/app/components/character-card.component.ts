import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit, computed, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Character } from '../models/character.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faHeart as heartThin } from '@fortawesome/free-regular-svg-icons';
import { faHeart as heartSolid } from '@fortawesome/free-solid-svg-icons';
import { NgIf } from '@angular/common';
import UserService from '../services/user.service';

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  selector: 'signals-character-card',
  template: `
    <ion-card>
      <img [src]="character.image" />
      <ion-card-content class="flex">
        <h2 class="ion-text-center">{{ character.name }}</h2>
        <fa-icon *ngIf="characterSelected()" [icon]="iconSolid" (click)="toggleIcon()"></fa-icon>
        <fa-icon *ngIf="!characterSelected()" [icon]="iconThin" (click)="toggleIcon()"></fa-icon>
      </ion-card-content>
    </ion-card>
  `,
  styles: [
    `
      img {
        width: 100%;
      }

      fa-icon {
        position: absolute;
        right: 10px;
        top: 5px;
        cursor: pointer;
        font-size:25px;
      }
    `,
  ],
  imports: [IonicModule, FontAwesomeModule, NgIf],
})
export default class CharacterCardComponent {
  @Input() character!: Character;


  userService = inject(UserService);
  iconSolid = heartSolid;
  iconThin =  heartThin;
  characterSelected = computed(() => this.userService.getUser()?.likedCharacters.some((c: string) => c === this.character?.name));

  icon = heartThin;

  toggleIcon() {
    this.userService.likeCharacter(this.character.name);
  }
}
