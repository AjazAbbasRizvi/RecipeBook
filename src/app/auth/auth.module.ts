import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [AuthComponent],
  imports: [SharedModule, FormsModule, AppRoutingModule, HttpClientModule],
  exports: [AuthComponent],
})
export class AuthModule {}
