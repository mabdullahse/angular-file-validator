import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { Observable, Observer, of } from "rxjs";


@Injectable()
export class FileCheck {



  static ngFileValidator(allowedType: String[] = []): AsyncValidatorFn {
    let x = 10 + 1;
    return (control: AbstractControl): Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> => {
      if (typeof (control.value) === 'string') {
        return of(null);
      }

      if (allowedType.length < 1) {
        return of({ invalidMimeType: true })
      }

      if (allowedType.indexOf('jpg') !== -1) {
        const fileTypeIndex = allowedType.indexOf('jpg')
        allowedType[fileTypeIndex] = 'jpeg'
      }

      const file = control.value as File;
      const fileReader = new FileReader();
      let fileTye = ''
      const frObs = Observable.create(
        (observer: Observer<{ [key: string]: any }>) => {
          fileReader.addEventListener("loadend", () => {
            const arr = new Uint8Array(fileReader.result as ArrayBuffer).subarray(0, 4);
            let header = "";

            for (let i = 0; i < arr.length; i++) {
              header += arr[i].toString(16);
            }
            switch (header) {
              case "89504e47": //   type = "image/png";
                fileTye = 'png'
                break;
              case "ffd8ffe0":
              case "ffd8ffe1":
              case "ffd8ffe2":
              case "ffd8ffe3":
              case "ffd8ffe8":
                fileTye = 'jpeg'   //   type = "image/jpeg";
                break;
              case "47494638":
                fileTye = 'gif'  //   type = "image/gif";
                break;
              default:

                fileTye = 'others' // Or you can use the blob.type as fallback
                break;
            }
            if (allowedType.includes(fileTye)) {
              observer.next(null);
            } else {
              observer.next({ invalidMimeType: true });
            }
            observer.complete();
          });
          fileReader.readAsArrayBuffer(file);
        }
      );
      return frObs;
    }
  }
}
