import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output () featureSelected = new EventEmitter<string>();

  private userSubscription : Subscription;
  public isAuthenticated : boolean = false;

  constructor(private dataStorageSerive : DataStorageService,
              private router : Router,
              private authService : AuthService) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe(user =>{
     if (!user) {
       this.isAuthenticated = false;
     }
     else{
      this.isAuthenticated = true;
     }
    })
  }

  onSelect(feature : string){
    this.featureSelected.emit(feature);
  }

  onSaveData(){
    this.dataStorageSerive.storeRecipe();
  }

  onFectchData(){
    this.dataStorageSerive.fetchRecipe().subscribe();
  }

  onAuthPage(){
    this.router.navigate(['/auth']);
  }

  onLogout(){
    this.authService.logOut();
  }

  ngOnDestroy(): void {
      this.userSubscription.unsubscribe();
  }

}
