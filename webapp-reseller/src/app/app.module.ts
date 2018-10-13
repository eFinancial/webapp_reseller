import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import {WalletComponent, WalletDialogComponent} from './wallet/wallet.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from "@angular/material";
import {MatDialogModule } from "@angular/material";
import {MatDialogRef} from "@angular/material";


@NgModule({
  declarations: [
    AppComponent,
    WalletComponent,
    WalletDialogComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,


  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [WalletDialogComponent, WalletComponent],
})
export class AppModule { }
