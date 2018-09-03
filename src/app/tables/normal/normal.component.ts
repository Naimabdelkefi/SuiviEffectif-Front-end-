import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import swal from 'sweetalert2';

declare const $: any;

@Component({
  selector: 'app-normal',
  templateUrl: './normal.component.html',
  styleUrls: ['./normal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NormalComponent implements OnInit {
  data: any = null;
  TurnOver: any = [];
  Depart: any = [];
  Entry: any = [];

  constructor(public http: Http) {
  }

  ngOnInit() {
    this.http.get('/suivi_effectif/Turnover').map(resp => resp.json())
      .subscribe((data: any) => {
        this.data = data;
        for (let entry of data) {
          this.TurnOver.push({
            Periode: entry.date,
            Mois: entry.mois,
            Annee: entry.année,
            Depart: entry.depart,
            Effectif: entry.effectif,
            Mobilite: entry.mobilité,
            Valeur: entry.valeur,
            Demission: entry.démission,
            TalentSharing: entry.talentSharing,
            congeSansSolde: entry.congéSansSolde,
            Entree: entry.entree
          });

        }
        this.http.get('/suivi_effectif/Depart').map(resp => resp.json())
          .subscribe((data: any) => {
            this.data = data;
            for (let entry of data) {
              this.Depart.push({
                Date: entry.periode, Nom: entry.nom, Prenom: entry.prénom, Departement: entry.département,
                Poste: entry.poste_Administratif,Motif:entry.motif
              });
            }
            ;
          });
        this.http.get('/suivi_effectif/Entry').map(resp => resp.json())
          .subscribe((data: any) => {
            this.data = data;
            for (let entry of data) {
              this.Entry.push({
                Date: entry.periode, Nom: entry.nom, Prenom: entry.prénom, Departement: entry.département,
                Poste: entry.poste_Administratif
              });
            }
            ;
          });
      });


    setTimeout(function () {
      $(function () {
        // Exportable table
        $('.js-exportable').DataTable({
          scrollX: true,
          select: true,
          ordering: false,
          dom: 'Bfrtip',
          buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
          ]
        });
      });
    }, 3000);


  }
  infoDepart(entry: any) {
    let ContentHtml: any = "";
    for (let element of this.Depart) {
      if ((element.Date == entry) && ((element.Motif=='mobilité')||(element.Motif=='Démission'))) {
        console.log(element);
        ContentHtml = ContentHtml + "<tr><td>" + element.Nom + " " + element.Prenom + "</td><td>" + element.Departement + "</td><td>" + element.Poste + "</td></tr>";
      }
    }

    ;

    swal({
      title: '  <span style="color:#6495ED;font-weight:bold">'
      + entry + ' ' + '</span> ',
      showConfirmButton: true,
      width: '825px',
      html: `<table id="table" border=1 class="table table-bordered  table-striped">
        <thead>
              <tr>
                <th>Nom et Prénom</th>
                <th>Département</th>
                <th>Poste Administratif</th>
              </tr>
              </thead>
        <tbody>`
      + ContentHtml +
      `
          </tbody>
</table>`,

      type: 'info'
    });

  }


  infoDate(entry: any,type:any) {
    let ContentHtml: any = "";
    for (let element of this.Depart) {
      if ((element.Date == entry) && (element.Motif==type)) {
        console.log(element);
        ContentHtml = ContentHtml + "<tr><td>" + element.Nom + " " + element.Prenom + "</td><td>" + element.Departement + "</td><td>" + element.Poste + "</td></tr>";
      }
    }

    ;

    swal({
      title: '  <span style="color:#6495ED;font-weight:bold">'
      + entry + ' ' + '</span> ',
      showConfirmButton: true,
      width: '825px',
      html: `<table id="table" border=1 class="table table-bordered  table-striped">
        <thead>
              <tr>
                <th>Nom et Prénom</th>
                <th>Département</th>
                <th>Poste Administratif</th>
              </tr>
              </thead>
        <tbody>`
      + ContentHtml +
      `
          </tbody>
</table>`,

      type: 'info'
    });

  }

  infoEntry(entry: any) {
    let ContentHtml: any = "";
    for (let element of this.Entry) {
      if (element.Date == entry) {
        ContentHtml = ContentHtml + "<tr><td>" + element.Nom + " " + element.Prenom + "</td><td>" + element.Departement + "</td><td>" + element.Poste + "</td></tr>";
      }
    }
    ;

    swal({
      title: '  <span style="color:#6495ED;font-weight:bold">'
      + entry + ' ' + '</span> ',
      showConfirmButton: true,
      width: '825px',
      html: `<center><table id="table" border=1 class="table table-bordered  table-striped">
        <thead>
              <tr>
                <th>Nom et Prénom</th>
                <th>Département</th>
                <th>Poste Administratif</th>
              </tr>
              </thead>
        <tbody>`
      + ContentHtml +
      `
          </tbody>
</table>
</center>`,

      type: 'info'
    });

  }

}
