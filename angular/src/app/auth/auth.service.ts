import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs'
import { User } from './user.model'
import { tap } from 'rxjs/operators'
import { Router } from '@angular/router'

interface AuthResponseData {
    _id: string,
    username: string,
    fullname: string,
    email: string,
    dob: string,
    banking: {
        balance: string,
    }
}

@Injectable({providedIn:  'root'})

export class AuthService {

    user = new BehaviorSubject<User>(null);
    constructor(private http: HttpClient, private router: Router) {}

    signUp(username: string, password: string, email: string, dob: string, fullname: string) {
        return this.http.post('http://localhost:3001/user/add', {
            username: username,
            password: password,
            fullname: fullname,
            email: email,
            dob: dob
        })
    }

    signIn(username:string, password:string) {
        return this.http.post<AuthResponseData>('http://localhost:3001/user/login', {
            username: username,
            password: password
        }).pipe(tap(resData => {
            const user = new User(resData._id, resData.username, resData.fullname, resData.dob, resData.banking.balance)
            this.user.next(user)
            localStorage.setItem('userData', JSON.stringify(user))
        }))
    }

    autoLogin(){
        const userData:{
            id: string,
            username: string,
            fullname: string,
            dob: string,
            balance: string
        } = JSON.parse(localStorage.getItem('userData'));
        
        if (!userData) {
            return;
        }
        const loadUserData = new User(userData.id, userData.username, userData.fullname, userData.dob, userData.balance)
        this.user.next(loadUserData)
    }

    logOut() {
        this.user.next(null);
        localStorage.removeItem('userData');
        this.router.navigate(['/login'])
    }
}