import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Effectif} from "../../../model/model.effectif";
import {Http} from "@angular/http";
import {FormBuilder, Validators, FormControl, FormGroup, NgForm} from "@angular/forms";
import "rxjs/add/operator/map";
import swal from 'sweetalert2';
import {ActivatedRoute} from "@angular/router";
declare const $: any;
@Component({
  selector: 'app-form-editors',
  templateUrl: './form-editors.component.html',
  styleUrls: ['./form-editors.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FormEditorsComponent implements OnInit {
  effectif:Effectif=new Effectif();
  prenom:String;
  pole:String;
  NomResp:String;
  deprt:String;
  motifentre:String;
  idEffectif:number;

  constructor(public http: Http,activatedroute: ActivatedRoute) {
   this.idEffectif=activatedroute.snapshot.params  ['id'];
  }

  ngOnInit() {
    this.http.get('/suivi_effectif/Effectif/'+this.idEffectif).map(resp=>resp.json())
      .subscribe((data: any) => {

        this.NomResp=data.nom_de_responsable_associé;
        this.deprt=data.département;
        this.motifentre=data.motif_dentrée;
        this.prenom=data.prénom;
        this.pole=data.pôle;
        $('.Datedentrée').val(data.date_dentrée);
        $('.DatedeSortie').val(data.date_de_sortie);
        $('.Datedépôtdémission').val(data.date_dépôt_Démission);
        this.effectif=data;
      });

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
    this.http.put('/suivi_effectif/Effectif/'+this.effectif.id,this.effectif).subscribe((data: any)=> {
      swal(
        'Collaborateur Modifé!',
      )

    },err=>{console.log(err)});
  }
}

