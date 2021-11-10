import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './home/home.component';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  declarations: [
    MainLayoutComponent,
    HeaderComponent,
    SideBarComponent,
    HomeComponent,
  ],
  imports: [CommonModule, BrowserModule, RouterModule, MatButtonModule],
  exports: [
    MainLayoutComponent,
    HeaderComponent,
    SideBarComponent,
    HomeComponent,
  ],
})
export class LayoutModule {}
