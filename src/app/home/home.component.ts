import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { User } from '../models/user.model';
import { UserService, AuthenticationService } from '../services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  users = [];
  editForm: FormGroup;
  submitted : boolean = false ;
  editUserId: any;
  loading: boolean = false;

  constructor(
      private authenticationService: AuthenticationService,
      private userService: UserService,
      private fb : FormBuilder
  ) {
    this.currentUser = this.authenticationService.currentUserValue;    
  }

  ngOnInit() {
    this.editFormValidation();
    this.loadAllUsers();

  }
 
  // Form intialisation here
  editFormValidation(){
    this.editForm = this.fb.group({
      username : new FormControl('' ,Validators.required)
    });
  }

  get f () {
    return this.editForm.controls;
  }

  deleteUser(id: number) {
    this.userService.delete(id)
        .pipe(first())
        .subscribe(() => this.loadAllUsers());
  }
  
  editUser(id: number , username : string ){
    this.editUserId = id ;
    this.editForm.patchValue({
      username : username
    })
  }

  updateUser(){
    this.submitted =  true ;
    if (this.editForm.valid){
    this.loading = true;    
    this.userService.edit(this.editUserId , this.editForm.value)
    .pipe(first())
    .subscribe(() => {
      this.loadAllUsers()
      this.editUserId =  null ; 
      this.submitted =   false ;
      this.loading = false;
    },err=>{
      this.loading = false;
    });
   }
  }

  cancel(){
    this.editUserId =  null ; 
    this.submitted =   false ;
  }

  private loadAllUsers() {
    this.userService.getAll()
        .pipe(first())
        .subscribe(users => this.users = users);
  }

}
