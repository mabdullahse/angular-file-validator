import { Component, OnInit, } from '@angular/core';
import { FormGroup, FormControl, Validators, } from '@angular/forms';
import * as data from '@ng/file-validator'
import { FileCheck } from '@ng/file-validator'

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
        asyncValidators: [FileCheck.ngFileValidator(['png', 'jpeg'])]
      })
    })
  }


  onAddFile(event: Event) {

    const file = (event.target as HTMLInputElement).files[0]
    if (file) {
      this.form.patchValue({
        image: file
      })
      this.form.get('image').updateValueAndValidity()

      const reader = new FileReader()
      reader.onload = () => {

        this.filePreview = reader.result as String
      }
      reader.readAsDataURL(file)

    }
    console.log(this.form);

  }


  onCreate() {

    alert('Form Validity Status :  ' + !this.form.invalid)
    return

  }

}
