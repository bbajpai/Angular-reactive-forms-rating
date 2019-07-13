import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms'


import { Customer } from './customer';

function ratingRange(min:number, max:number): ValidatorFn{
    return (c:AbstractControl):{[key:string]:boolean}| null => {
        if(c.value != undefined && (isNaN(c.value) || c.value < min || c.value > max)){
            return {'range': true}
        };
        return null;
    
    }
}



@Component({
    selector: 'my-signup',
    templateUrl: './customer.component.html'
})
export class CustomerComponent implements OnInit{
    
    customerForm : FormGroup;
    customer: Customer= new Customer();

    constructor(private fb: FormBuilder){

    }

    ngOnInit(): void {

        this.customerForm = this.fb.group({
            firstName : ['',[Validators.required,Validators.minLength(5)]],
            lastName : ['', [Validators.required,Validators.maxLength(5)]],
            email :'',
            phone:'',
            notification: 'email',
            rating:['', ratingRange(1,10)],
            sendCatalog:true
        })

        // this.customerForm = new FormGroup({
        //     firstName : new FormControl(),
        //     lastName : new FormControl(),
        //     email : new FormControl(),
        //     sendCatalog:new FormControl(true)
        // });
    }

    populateData(): void{
        this.customerForm.patchValue({
            firstName :'Jane',
            lastName : 'Dave',
            sendCatalog:'true'
        })
    }
    save(){
        console.log(this.customerForm);
        console.log("Saved Values : " + JSON.stringify(this.customerForm.value));
    }

    setNotification(notifyBy:string):void{
        const phoneControl = this.customerForm.get('phone');
        console.log("Selected radio value : "+ notifyBy);
        if(notifyBy === 'text'){
            phoneControl.setValidators(Validators.required);
        }
        else{
            phoneControl.clearValidators();
        }
        phoneControl.updateValueAndValidity();
    }
 }
