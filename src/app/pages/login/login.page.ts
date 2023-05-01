import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import UserService from 'src/app/services/user.service';

@Component({
    standalone: true,
    imports: [
        IonicModule,
        AsyncPipe,
        NgIf,
        NgFor,
        ReactiveFormsModule
    ],
    selector: 'signals-login',
    templateUrl: 'login.page.html',
    styleUrls: ['./login.page.scss'],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

// eslint-disable-next-line @angular-eslint/component-class-suffix
export default class LoginPage {
    showErrorModal = signal(false);
    
    formGroup: FormGroup;
    alertButtons = ['OK'];

    constructor(private userService: UserService, private router: Router) {

        const user = this.userService.getUser();
        if (user) {
            this.router.navigate(['home']);
        }
        this.formGroup = new FormGroup({
            username: new FormControl(null, {
                validators: [Validators.required]
            }),
            password: new FormControl(null, {
                validators: [Validators.required]
            })
        });
    }
    submit() {
        if (!this.formGroup.valid) {
            this.showErrorModal.set(true);
            return;
        }

        // make Http Call
        this.userService.login(this.formGroup.get('username')?.value).subscribe(res => {
            console.log(res);
            this.userService.setUser(res);
            this.router.navigate(['home']);
        })
    }
}