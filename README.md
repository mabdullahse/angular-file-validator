# NgFileValidator

Check the image file of a Buffer/Uint8Array that matched expected image MIME-type

## Install
```
$ npm i angular-file-validator
```

## Usage

Its just involve only two steps
a. import NgFileValidatorLibModule in app.modules.ts
b. import FileCheck in our desired component

##### App.Module.ts

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms'
import { AppComponent } from './app.component';
import { NgFileValidatorLibModule } from '@ng/file-validator'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgFileValidatorLibModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

#### App.component.ts

```ts
import { Component, OnInit, } from '@angular/core';
import { FormGroup, FormControl, Validators, } from '@angular/forms';
import { FileCheck } from '@ng/file-validator' // <-------

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  form: FormGroup
  filePreview: String


  ngOnInit(): void {

    this.form = new FormGroup({

      image: new FormControl(null, {
        validators: Validators.required,
        asyncValidators: [FileCheck.ngFileValidator(['png', 'jpeg'])] // <-------
      })
    })
  }

``` 

 

## Supported file types
 It can check the following file formates
 1. png
 2. jpg
 3. jpeg
 4. gif
 
 so we can use as  [FileCheck.ngFileValidator(['png', 'jpeg','gif','jpeg'])]
