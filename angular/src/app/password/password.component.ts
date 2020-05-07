import { Component, OnInit } from '@angular/core';
import { BankService } from '../bankservice/bankservice.service';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-password',
    templateUrl: './password.component.html',    
})
export class PasswordComponent implements OnInit {

    userData: any;
    afterUpdate: object;
    alert: boolean = false;
    alertType: string;
    alertText: string;

    constructor(private bankService: BankService) {}

    ngOnInit() {
        this.userData = JSON.parse(localStorage.getItem('userData'));
    }

    onSubmit(form: NgForm){
        this.alertText = 'Fill all fields!';
        this.alertType = 'danger';
        if (!form.valid) {
            this.alert = true;
            return;
        }
        this.alert = false;
        const formValue = form.value;

        if (formValue.newpass !== formValue.confirmpass) {
            this.alert = true;
            this.alertText = 'New password & confirm password are not same!'
            return;
        }
        const updateData = {
            current_pass: formValue.currentpass,
            password: formValue.newpass
        }
        this.bankService.updateUserPassword(this.userData.id, updateData).subscribe(resData => {
            this.afterUpdate = resData;
            this.alert = true;
            this.alertType = 'success';
            this.alertText = 'Password changed successfully!';
            form.reset();
        }, error => {
            this.alert = true;
            if (error.error.message) {
                this.alertText = error.error.message
            } else if (error.error.errmsg) {
                this.alertText = error.error.errmsg
            }
            console.log(error);
        })
    }

}