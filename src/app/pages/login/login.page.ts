import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
    standalone: true,
    imports: [
        IonicModule,
        AsyncPipe,
        NgIf,
        NgFor
    ],
    selector: 'app-login',
    templateUrl: 'login.page.html',
    styleUrls: ['./login.page.scss']
})

// eslint-disable-next-line @angular-eslint/component-class-suffix
export default class LoginPage  {
    
}