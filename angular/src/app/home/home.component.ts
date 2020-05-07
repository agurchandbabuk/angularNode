import { Component, OnInit, OnDestroy } from '@angular/core';
import { BankService } from '../bankservice/bankservice.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  userData:any;
  transactions: any;
  userBalance: any;

  constructor(private bankService: BankService) { }

  ngOnInit() {

    this.userData = JSON.parse(localStorage.getItem('userData'));
        
    this.bankService.getUserTransactions(this.userData.id).subscribe(resData => {      
      this.transactions = resData;
      this.transactions.map( (data, index) => {
       var datePipe = new DatePipe("en-US");
       this.transactions[index].transDate = datePipe.transform(data.transDate, 'dd-MM-yyyy h:m a');
       if (data.transDesc === '') {
        this.transactions[index].transDesc = 'No Description';
       }
      })
      console.log(this.transactions)
    }, error => {
        console.log(error)
    });

    this.bankService.getUserbalance(this.userData.id).subscribe(resData => {
      this.userBalance = resData;
      this.userBalance = this.userBalance.balance;
    }, error => {
      console.log(error)
    });
    
  }

}
