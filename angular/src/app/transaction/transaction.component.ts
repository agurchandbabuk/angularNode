import { Component } from '@angular/core';
import { BankService } from '../bankservice/bankservice.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-transaction',
    templateUrl: './transaction.component.html'
})

export class TransactionComponent {

    fillAll: boolean = false;
    alertType: string;
    alertText: string;
    
    constructor(private bankService: BankService, private router: Router) {}

    onSubmit(form: NgForm) {
        if (!form.valid) {
            this.fillAll = true;
            this.alertType = 'danger';
            this.alertText = 'Fill all fields';
            return;
        }
        this.fillAll = false;
        const formValues = form.value;
        const userData = JSON.parse(localStorage.getItem('userData'))

        const transData = {
            transUserId: userData.id,
            transType: formValues.transType,
            transAmt: formValues.transAmt,
            transDesc: formValues.transDesc,
            transDate: new Date().toString()
        }
        console.log(transData);
        this.bankService.addUserTransaction(transData).subscribe(resData => {
            console.log(resData);
            this.fillAll = true;
            this.alertText = 'Transaction Done!';
            this.alertType = 'success';
            form.reset();
            setTimeout(() => {
                this.router.navigate(['home']);
            }, 500);
        }, error => {
            console.log(error);
        })
    }

}