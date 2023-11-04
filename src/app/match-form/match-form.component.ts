import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation, MatStepperModule} from '@angular/material/stepper';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import { RouterModule, Router,ActivatedRoute } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DirectoryService } from '../services/directory.service';




@Component({
  selector: 'app-match-form',
  templateUrl: './match-form.component.html',
  styleUrls: ['./match-form.component.scss'],
  
})
export class MatchFormComponent implements OnInit {
  token:any;
  email:any;
  preregister: any = { "name":"", "email":""};
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  stepperOrientation: Observable<StepperOrientation>;


  constructor(private _formBuilder: FormBuilder, breakpointObserver: BreakpointObserver,
    private directoryService: DirectoryService, private httpClient: HttpClient,
    private routes: Router) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
      this.token = JSON.parse(localStorage.getItem('userData')|| '{}').token; 
  }

  isLinear = true;


  ngOnInit() {

  }

  /*preRegister() {
    console.log(this.preregister);
    this.directoryService.preRegister(this.token, this.preregister )
      .then(data => {
        this.preregister = data; // Update preregister with the response data if needed
        console.log(this.preregister);
      })
      .catch(error => {
        console.log(error);
      });
  }*/

  preRegister() {
    this.directoryService.preRegister(this.token, this.preregister)
      .subscribe(
        (data) => {
          this.preregister = data; // Update preregister with the response data if needed
          console.log(this.preregister);
        },
        (error) => {
          console.error('Error in preRegister: ', error);
          // Handle error, show a message to the user, etc.
        }
      );
  }
  

}
