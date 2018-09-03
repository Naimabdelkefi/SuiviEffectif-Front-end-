import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Http} from "@angular/http";
import "rxjs/add/operator/map"
import {Router} from "@angular/router";
import {Effectif} from "../../../model/model.effectif";
import swal from 'sweetalert2';

declare const $: any;

@Component({
  selector: 'app-jquery-datatable',
  templateUrl: './jquery-datatable.component.html',
  styleUrls: ['./jquery-datatable.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class JqueryDatatableComponent implements OnInit {
  data: any = null;
  Effectif:any=[];
  constructor(public http: Http,public router:Router) { }


  ngOnInit() {

    this.http.get('/suivi_effectif/Effectif').map(resp=>resp.json())
      .subscribe((data: any) => {
        this.data = data;
        for (let entry of data) {
          this.Effectif.push({id:entry.id,Pole:entry.pôle,Nom:entry.nom,Prenom:entry.prénom,CUID:entry.cuid,JobList:entry.job_list,PosteAdmin:entry.poste_Administratif,NomResp:entry.nom_de_responsable_associé,Deprt:entry.département,
          DateEntr:entry.date_dentrée,DateSort:entry.date_de_sortie,MotifSort:entry.motif_de_sortie,Sexe:entry.hf});

         };
        console.log(this.Effectif);
      });
    setTimeout(function(){ $(function () {
      // Exportable table
      $('.js-exportable').DataTable({
        scrollX: true,
        select: true,
        dom: 'Bfrtip',
        buttons: [
          'copy', 'csv', 'excel', 'pdf', 'print'
        ]
      });
    });},3000);

  }
  onEditContact(id:number){
    this.router.navigate(['effectif/edit-effectif/',id]);

  }
  onDeleteContact(effectif:Effectif){
    swal({
      title: ' Supprimer le Collaborateur',
      text: "Êtes-vous sûr?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui!'
    }).then((result) => {
      if (result.value) {
        this.http.delete('/suivi_effectif/Effectif/'+effectif.id).subscribe((data: any)=> {
          this.Effectif.splice(this.Effectif.indexOf(effectif),1);
          swal(
            'Collaborateur Supprimer!',
          )

        },err=>{console.log(err)});
      }
    })

};


}
