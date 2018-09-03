import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Http} from "@angular/http";
import "rxjs/add/operator/map"
declare const $: any;
declare const Morris: any;

@Component({
  selector: 'app-morris',
  templateUrl: './morris.component.html',
  styleUrls: ['./morris.component.css']
})
export class MorrisComponent implements OnInit {
  data: any = null;
  TurnOver:any=[];
  Pourcentage:any=[];
  NbreDepartEntree:any=[];
  DetailsTurn:any=[];
  Deprt:any=[];
  Nbre_Effectif:any=[];
  Pole:String="OLS";
  Annee:any=[];
  i:number=0;
  morrisBar:any;
  morrisDepart:any;
  morrisDetail:any;
  morrisDon:any;
  morrisEffectif:any;
  constructor(public http: Http) { }
  changeAnnee(a:String){
    this.http.get('/suivi_effectif/Turnover').map(resp=>resp.json())
      .subscribe((data: any) => {
      this.NbreDepartEntree=[];
        this.data = data;
        for (let entry of data) {
          if (entry.année===a){
            this.NbreDepartEntree.push({Mois:entry.date,Entree:entry.entree,Depart:entry.depart});
          }};
        this.morrisDepart.setData(this.NbreDepartEntree);
      })}
  changeAnneeEffectif(a:String){
    this.http.get('/suivi_effectif/Turnover').map(resp=>resp.json())
      .subscribe((data: any) => {
        this.Nbre_Effectif=[];
        this.data = data;
        for (let entry of data) {
          if (entry.année===a){
          this.Nbre_Effectif.push({Date:entry.date,Nbre:entry.effectif});}
        };
        this.morrisEffectif.setData(this.Nbre_Effectif);
      })}
  changePolePourc(t:String){
    this.Pole=t;
    this.http.get('/suivi_effectif/Effectif/Pourcentage?pole='+this.Pole).map(resp=>resp.json())
      .subscribe((data: any) => {
        this.data = data;
        this.Pourcentage=[];
        for (let entry of data) {
          this.Pourcentage.push({label:entry.sexe,value:Math.round((entry.valeur))});
        };
        this.morrisDon.setData(this.Pourcentage);
    console.log(this.Pole);
  })}
  changePoleDeprt(t:String){
    this.Pole=t;
    this.http.get('/suivi_effectif/Effectif/Depratement?pole='+this.Pole).map(resp=>resp.json())
      .subscribe((data: any) => {
        this.data = data;
        this.Deprt=[];
        for (let entry of data) {
          if(entry.nbre!=0){
            this.Deprt.push({Deprt:entry.deprt,Nbre:entry.nbre});};
        };
        this.morrisBar.setData(this.Deprt);

    console.log(this.Pole);
  })}
  ngOnInit() {
    this.http.get('/suivi_effectif/Turnover').map(resp=>resp.json())
      .subscribe((data: any) => {
        this.data = data;
        for (let entry of data) {
        if(!(this.Annee.includes(entry.année))) {
          this.Annee.push(entry.année);
        }}
      });
    this.http.get('/suivi_effectif/Turnover').map(resp=>resp.json())
      .subscribe((data: any) => {
      this.data = data;
        for (let entry of data) {
          this.DetailsTurn.push({Mois:entry.date,Mobilité:entry.mobilité,Démission:entry.démission,TalentSharing:entry.talentSharing,CongéSansSolde:entry.congéSansSolde})
          if (entry.valeur!=0){
         this.TurnOver.push({Mois:entry.date,TurnOver:Math.round(entry.valeur)});
        }};
        this.morrisDetail= Morris.Area({
          element: 'TurunOverDetailsChart',
          data:this.DetailsTurn,
          xkey: 'Mois',
          xLabels:"month",
          ykeys: ['Mobilité', 'Démission','TalentSharing','CongéSansSolde'],
          labels: ['Mobilité', 'Démission','TalentSharing','CongéSansSolde'],
          pointSize: 3,
          fillOpacity: 0,
          lineColors: ['#222222', '#cc0004', '#4c9c00','#9c1e5c'],
          behaveLikeLine: true,
          gridLineColor: '#e0e0e0',
          lineWidth: 2,
          hideHover: 'auto',
          //lineColors: ['#cc7b19'],
          resize: true
        });


// LINE CHART
        const line = new Morris.Line({
          element: 'TurnOverChart',
          resize: true,
          data: this.TurnOver,
          xkey: 'Mois',
          xLabels:"month",
          ykeys: ['TurnOver'],
          labels: ['TurnOver'],
          gridLineColor: '#eef0f2',
          lineColors: ['#78b83e'],
          lineWidth: 2,
          pointSize: 3,
          hideHover: 'auto',
          ymin:20
        });});
// Morris bar chart
        this.http.get('/suivi_effectif/Turnover').map(resp=>resp.json())
          .subscribe((data: any) => {
            this.data = data;
            for (let entry of data) {
              if (entry.année===this.Annee[this.Annee.length-1]){
                this.NbreDepartEntree.push({Mois:entry.date,Entree:entry.entree,Depart:entry.depart});
              }};
           this.morrisDepart= Morris.Bar({
              element: 'EntreeSortie',
              data:this.NbreDepartEntree,
              xkey: 'Mois',
              xLabels:"month",
              ykeys: ['Entree',"Depart"],
              labels: ['Entrée',"Depart"],
              pointSize: 0,
              fillOpacity: 0.4,
             barColors: ['#1dca09','#ca2416'],
              pointStrokeColors: ['#457fca','#4bca2e'],
              behaveLikeLine: true,
              gridLineColor: '#e0e0e0',
              lineWidth: 0,
              smooth: false,
              hideHover: 'auto',
              xLabelAngle: 60,
              lineColors: ['#457fca','#4bca2e'],
              resize: true
            });
          });
            this.http.get('/suivi_effectif/Turnover').map(resp=>resp.json())
              .subscribe((data: any) => {
                this.data = data;
                for (let entry of data) {
                  if (entry.année===this.Annee[this.Annee.length-1]){
                  this.Nbre_Effectif.push({Date:entry.date,Nbre:entry.effectif});}
                };
                this.morrisEffectif=Morris.Bar({
                element: 'Nbre_Effectif',
                  data: this.Nbre_Effectif,
                  xkey: 'Date',
                  ykeys: ['Nbre'],
                  labels: ["Nombre d'effectif"],
                  barColors: ['#cc4b22'],
                  hideHover: 'auto',
                  gridLineColor: '#eef0f2',
                  resize: false,
                  xLabelAngle: 30
        });
      });
    this.http.get('/suivi_effectif/Effectif/Depratement?pole='+this.Pole).map(resp=>resp.json())
      .subscribe((data: any) => {
        this.data = data;
        for (let entry of data) {
          if(entry.nbre!=0){
          this.Deprt.push({Deprt:entry.deprt,Nbre:entry.nbre});};
        };
        this.morrisBar = Morris.Bar({
          element: 'Depratemnt_chart',
          data: this.Deprt,
          xkey: 'Deprt',
          ykeys: ['Nbre'],
          labels: ["Nombre d'effectif"],
          barColors: ['#c8cf08'],
          hideHover: false,
          gridLineColor: '#eef0f2',
          resize: false,
          xLabelAngle: 30
        });
      });
      // Dashboard 1 Morris-chart
    this.http.get('/suivi_effectif/Effectif/Pourcentage?pole='+this.Pole).map(resp=>resp.json())
      .subscribe((data: any) => {
        this.data = data;
        for (let entry of data) {
            this.Pourcentage.push({label:entry.sexe,value:Math.round(entry.valeur)});
          };
// Morris donut chart
      this.morrisDon=Morris.Donut({
          element: 'Pourcentage_Sexe',
          data: this.Pourcentage,
          resize: true,
          colors: ['#ffd97f', '#fab2c0'],
        formatter: function (value, data) { return value+ '%'; }
      });
      });
}

}
