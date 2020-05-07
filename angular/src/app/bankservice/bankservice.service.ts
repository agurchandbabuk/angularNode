import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class BankService {

    constructor(private http: HttpClient) {}

    getUserbalance(user_id) {
        return this.http.get('http://localhost:3001/user/balance/'+user_id);
    }

    getUserTransactions(user_id) {        
        return this.http.get('http://localhost:3001/transaction/user/'+user_id);
    }

    addUserTransaction(transData) {
        return this.http.post('http://localhost:3001/transaction/add', transData);
    }
    
    updateUserPassword(user_id, data){
        return this.http.patch('http://localhost:3001/user/updatepass/'+user_id, data);
    }

}