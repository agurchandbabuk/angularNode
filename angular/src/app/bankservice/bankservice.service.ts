import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class BankService {

    user_id: string;

    constructor(private http: HttpClient){
        const userData = JSON.parse(localStorage.getItem('userData'));
        this.user_id = userData.id;
    }

    getUserbalance() {
        return this.http.get('http://localhost:3001/user/balance/'+this.user_id);
    }

    getUserTransactions() {        
        return this.http.get('http://localhost:3001/transaction/user/'+this.user_id);
    }

    addUserTransaction(transData) {
        return this.http.post('http://localhost:3001/transaction/add', transData);
    }
}