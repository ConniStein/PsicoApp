import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation, MatStepperModule} from '@angular/material/stepper';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import { RouterModule, Router,ActivatedRoute } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DirectoryService } from '../services/directory.service';
import { MatStepper } from '@angular/material/stepper';



@Component({
  selector: 'app-match-form',
  templateUrl: './match-form.component.html',
  styleUrls: ['./match-form.component.scss'],
  
})
export class MatchFormComponent implements OnInit {
  
  @ViewChild('stepper') stepper: MatStepper | undefined; // Add this line to define the stepper

  token:any;
  email:any;
  id: any;
  dataMatchForm: any;
  preregister: any = { "name":"", "email":""};
  stepTwoData: any = { 
    description: '', 
    selectedSymptoms: [], 
    personalInfo: '',
    ageRange: [],
    gender: [],
    modality: [] }
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

  isEditable = true;

  isStepOneComplete: boolean = false;
  isStepTwoComplete: boolean = false;

  showStepOneError: boolean = false;

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

  checkPreviousStepCompletion(stepper: MatStepperModule, stepNumber: number): boolean {
    if (stepNumber === 1) {
      return this.isStepOneComplete;
    } else if (stepNumber === 2) {
      return this.isStepTwoComplete; // Implement a logic to check step two completion
    }
    // Add similar logic for other steps if needed
    return false; // Default to false if step number doesn't match any known step
  }

  checkStepOneCompletion() {
    // Check if the inputs are filled (example logic)
    if (this.preregister.name && this.preregister.email) {
      this.isStepOneComplete = true;
    } else {
      this.isStepOneComplete = false;
      this.showStepOneError = true;
    }
  }

  

  checkStepTwoCompletion() {
    // Example logic to check Step Two completion status
    if (this.stepTwoData.description && this.stepTwoData.selectedSymptoms.length > 0 && 
      this.stepTwoData.personalInfo && this.stepTwoData.ageRange.length > 0 && 
      this.stepTwoData.gender.length > 0 && this.stepTwoData.modality.length > 0) {
      this.isStepTwoComplete = true;
    } else {
      this.isStepTwoComplete = false;

    }
  }
  

  /*preRegister() {
    this.directoryService.preRegister(this.preregister)
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
  }*/
  
  preRegister() {
    this.directoryService.preRegister(this.preregister).subscribe(
      (response: any) => {
        // Assuming the response structure is similar to what you've provided
        this.id = response.data[0].id;
        console.log('ID from the first step:', this.id);
        //this.updateAndNavigateToNextStep();
      },
      (error) => {
        console.error('Error in preRegister: ', error);
        // Handle error, show a message to the user, etc.
      }
    );
  }
  

  /*updateAndNavigateToNextStep() {
    this.updateMatchForm();
    // Navigate to the next step
    if (this.stepper) {
      this.stepper.next();
    }
  }


  updateMatchForm() {
    
    console.log(this.stepTwoData);
    const id = this.id;

    // Call the updateMatchForm function from your directoryService
    this.directoryService.updateMatchForm(this.stepTwoData, id)
      .then(
        (data) => {
          this.dataMatchForm = data; // Update dataMatchForm with the response data if needed
          console.log(this.dataMatchForm);
        },
        (error) => {
          console.error('Error in updateMatchForm: ', error);

        }
      );
  }*/

  updateAndNavigateToNextStep() {
    this.updateMatchForm(this.id); // Pass the 'id' as an argument
    // Navigate to the next step
    if (this.stepper) {
      this.stepper.next();
    }
  }
  
  updateMatchForm(id: any) {
    console.log(this.stepTwoData);
    
    // Call the updateMatchForm function from your directoryService
    this.directoryService.updateMatchForm(this.stepTwoData, id)
      .then(
        (data) => {
          this.dataMatchForm = data; // Update dataMatchForm with the response data if needed
          console.log(this.dataMatchForm);
        },
        (error) => {
          console.error('Error in updateMatchForm: ', error);
  
        }
      );
  }
  

}
