import {Component, NgModule, OnInit, ViewEncapsulation} from '@angular/core';
import {Http, RequestOptions, Headers} from "@angular/http";
import swal from 'sweetalert2';


@Component({
  selector: 'app-form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class FormUploadComponent implements OnInit {
  public headers = new Headers({'Accept': '*/*', 'X-Requested-With': 'XMLHttpRequest'})
  public options = new RequestOptions({headers: this.headers});
  Nomfichier: string;

  constructor(public http: Http) {
  }

  fileChange(event) {
    const files = event.target.files;
    if (files.length > 0) {
      let formData: FormData = new FormData();
      for (let file of files) {
        this.Nomfichier = file.name;
        formData.append('file', file, file.name);
      }
      console.log(formData);
      this.http.post('/suivi_effectif/upload', formData, this.options).subscribe(result => {
      }, erreur => {
        console.log(erreur);
      })
    }
  }


  ngOnInit() {
  }
  Misajoureffectif(){
    this.http.get('/suivi_effectif/misajoureffectif').subscribe(result => {
      swal(
      {
        type: 'success',
          text: " Liste d'effectif à jour!"
      })
    }, erreur => {
      console.log(erreur);
    })

  }
  MisajourTurnOver(){
    this.http.get('/suivi_effectif/misajourturnover').subscribe(result => {
      swal({
        type: 'success',
        text: "Données à jour!"
      })
    }, erreur => {
      console.log(erreur);
    })
  }
}

