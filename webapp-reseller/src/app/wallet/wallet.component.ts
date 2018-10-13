import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from "@angular/material";

export interface InvoiceData {
  invoice: Invoice;
  hash: string;
}

export interface Invoice {
  date: string;
  billNo: number;
  seller: Seller;
  products: Product[];
  totalCostBrutto: number;
  totalCostNetto: number;
  customerPaid: number;
  tax: number;
}

export interface Seller {
  name: string;
  address: Address;
  ustIdNr: string;
  storeID: string;
  checkoutLane: number;
}

export interface Product {
  name: string;
  count: number;
  itemPrice: number;
}

export interface Address {
  street: string;
  zip: string;
  city: string;

}
const invoiceData: InvoiceData = {
  hash: "afee217000",
  invoice: {
    date: new Date().toISOString(),
    billNo: 1,
    totalCostBrutto: 10,
    totalCostNetto: 11,
    customerPaid: 200,
    tax: 10,
    seller: {
      name: "Aldi",
      ustIdNr: "DE1010101100",
      address: {
        street: "Ortenauerstarße 14",
        zip: "77653",
        city: "Offenburg"
      },
      storeID: "ASC89281",
      checkoutLane: 2
    },
    products: [
      {
        name: "5xBanane",
        count: 1,
        itemPrice: 1.75
      },
      {
        name: "Radio",
        count: 1,
        itemPrice: 20
      },
      {
        name: "Erdnuss",
        count: 20,
        itemPrice: 0.05
      }
    ]
  }
};

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {


  invoice: InvoiceData[] = [invoiceData];

  openDialog(): void {
    const dialogRef = this.dialog.open(WalletDialogComponent, {
      width: '1000px',
      data: {name: invoiceData.invoice.tax}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
  }

}

@Component({
  selector: 'wallet-dialog',
  templateUrl: 'wallet.dialog.html',
  styleUrls: ['./wallet.dialog.scss']
})
export class WalletDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<WalletDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InvoiceData) {
    this.data = invoiceData;
  }
  getDate() {
    let date = new Date(invoiceData.invoice.date);
    let month = String(date.getMonth() + 1);
    let day = String(date.getDate());
    const year = String(date.getFullYear());

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return day + "." + month + "." + year;
  }

  getTime() {
    let date = new Date(invoiceData.invoice.date);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();
    return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
