import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router'

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})

export class AuthComponent {

    constructor(private authService: AuthService, private router: Router) {}

    isLoginMode = true;
    btnTxt = 'Log In';
    error:string = null;
    signupSuccess = false;
    successText:string = null;

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode
        this.btnTxt = (!this.isLoginMode) ? 'Sign Up': 'Log In'
    }

    onSubmit(form: NgForm){
        if (!form.valid) {
            return;
        }

        this.error = null;

        const username = form.value.username;
        const password = form.value.password;
        const email = form.value.email;
        const fullname = form.value.fullname;
        const dob = form.value.dob;

        if (!this.isLoginMode) {
            this.authService.signUp(username, password, email, dob, fullname).subscribe(resData => {
                this.signupSuccess = true;
                this.successText = 'Signup Success! Login to Continue';
                this.isLoginMode = true;
                this.btnTxt = 'Log In'
                form.reset()
            }, error => {
                console.log(error)
                if (error.error.message) {
                    this.error = error.error.message
                } else if (error.error.errmsg) {
                    this.error = error.error.errmsg
                }
            })
        } else {
            const username = form.value.username;
            const password = form.value.password;
    
            this.authService.signIn(username, password).subscribe(resData => {
                this.signupSuccess = true;
                this.successText = 'Login Success! Redirecting';
                this.router.navigate([''])
            }, error => {
                if (error.error.message) {
                    this.error = error.error.message
                } else if (error.error.errmsg) {
                    this.error = error.error.errmsg
                }
            })

        }

    }
}