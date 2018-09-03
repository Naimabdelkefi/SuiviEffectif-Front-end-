import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Effectif} from "../../../model/model.effectif";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import swal from 'sweetalert2';

declare const $: any;

@Component({
  selector: 'app-form-basic',
  templateUrl: './form-basic.component.html',
  styleUrls: ['./form-basic.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FormBasicComponent implements OnInit {
  effectif:Effectif=new Effectif();
  prenom:String;
  pole:String;
  NomResp:String;
  deprt:String;
  motifentre:String;

  constructor(public http: Http) { }

  ngOnInit() {
  //   this.myForm=this._fromBuilder.group({
  //     'Pole':[],
  //   'Nom':[],
  //   'Prenom':[],
  //   'CUID':[],
  //   'JobList':[],
  //   'PosteAdmin':[],
  //   'NomResp':[],
  //   'Deprt':[],
  //   'DateEntr':[],
  //   'DateSort':[],
  //   'MotifSort':[],
  //   'Sexe':[],
  //   'Projet':[],
  //   'Descrp':[],
  //   'Comn':[],
  // })

      $(function () {
        $('#form_validation').validate();
          $('.selectpicker').selectpicker();
          // Datetimepicker plugin
          $('.datetimepicker').bootstrapMaterialDatePicker({
            format: 'YYYY-MM-DD',
            clearButton: true,
            weekStart: 1,
            time: false
          });

          $('.datepicker').bootstrapMaterialDatePicker({
            format: 'YYYY-MM-DD',
              clearButton: true,
              weekStart: 1,
              time: false
          });

          $('.timepicker').bootstrapMaterialDatePicker({
              format: 'HH:mm',
              clearButton: true,
              date: false
          });
      });
  }

  SaveEffectif(){
    this.effectif.nom_de_responsable_associé=this.NomResp;
    this.effectif.département=this.deprt;
   this.effectif.motif_dentrée=this.motifentre;
   if($('.Datedentrée').val()==''){
     this.effectif.date_dentrée=null;
   }
   else{ this.effectif.date_dentrée=$('.Datedentrée').val();}
   if($('.DatedeSortie').val()==''){
     this.effectif.date_de_sortie=null;
   }
    else {this.effectif.date_de_sortie=$('.DatedeSortie').val();}
   if ($('.Datedépôtdémission').val()==''){
    this.effectif.date_dépôt_Démission=null;
   }
    else {this.effectif.date_dépôt_Démission=$('.Datedépôtdémission').val();}
    this.effectif.prénom=this.prenom;
    this.effectif.pôle=this.pole;
    console.log(this.effectif);
    this.http.post('/suivi_effectif/Effectif/',this.effectif).subscribe((data: any)=> {
      swal(
        'Collaborateur Ajouté!',
      )

    },err=>{console.log(err)});
}
}
