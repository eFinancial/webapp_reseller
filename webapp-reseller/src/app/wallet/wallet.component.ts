import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from "@angular/material";
import {ElementRef, ViewChild} from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import {HttpClient} from "@angular/common/http";

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
const invoiceData1: InvoiceData = {
  hash: "afee217dsa000",
  invoice: {
    date: new Date().toISOString(),
    billNo: 1,
    totalCostBrutto: 20,
    totalCostNetto: 114,
    customerPaid: 200,
    tax: 10,
    seller: {
      name: "lidl",
      ustIdNr: "DE10103542100",
      address: {
        street: "Straße 14",
        zip: "77654",
        city: "Offenburg"
      },
      storeID: "442281",
      checkoutLane: 1
    },
    products: [
      {
        name: "Banenen",
        count: 5,
        itemPrice: 1.75
      },
      {
        name: "Stuhl",
        count: 1,
        itemPrice: 75
      },
      {
        name: "Nutella",
        count: 2,
        itemPrice: 2.05
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

  backendURL = "https://efi-fallback.herokuapp.com/tam/efi/load";
  invoice: InvoiceData[] = [];

  openDialog(inV: InvoiceData): void {
    const dialogRef = this.dialog.open(WalletDialogComponent, {
      width: '1200px',
      data: inV
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  getDate(invoiceData: InvoiceData) {
    let date = new Date(invoiceData.invoice.date);
    let month = String(date.getMonth() + 1);
    let day = String(date.getDate());
    const year = String(date.getFullYear());

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return day + "." + month + "." + year;
  }


  constructor(public dialog: MatDialog,private httpCLient:HttpClient) {
  }

  ngOnInit() {
    this.httpCLient.get(this.backendURL).subscribe((invoices: InvoiceData[]) => {
      this.invoice = invoices;
    });
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
    this.data = data;
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

  public captureScreen() {
    let data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
// Few necessary setting options
      let imgWidth = 208;
      let pageHeight = 295;
      let imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      let position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('MYPdf.pdf'); // Generated PDF
    });
  }
}


