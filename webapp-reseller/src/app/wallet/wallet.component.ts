import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export interface Customer {
name: string;
surname: string;
street: string;
houseNumber: number;
postcode: number;
}
export interface Product{
  name: String;
  count: String;
  price: String;
}
export interface Invoice{
  customer: Customer;
  product: Product;
  date: Date;
  id: Number;
}
export class WalletComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
