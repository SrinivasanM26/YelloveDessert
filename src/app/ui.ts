import {Component,Input,Pipe,PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {Item} from './data';
import {QUOTES,MAP_URL,MAP_EMBED,PLACEHOLDER_IMG} from './extras';

@Pipe({name:'safe',standalone:true}) export class Safe implements PipeTransform{constructor(private d:DomSanitizer){}transform(u:string){return this.d.bypassSecurityTrustResourceUrl(u);}}

// item photo (tries .jpg/.jpeg/.png/.webp) -> placeholder photo (jpg1.jpg) -> emoji
@Component({selector:'pic',standalone:true,template:`@if(stage<list.length){<img class="pic" [src]="list[stage]" [alt]="it.name" (error)="stage=stage+1">}@else{<div class="emo">{{it.emoji}}</div>}`})
export class Pic{it!:Item;stage=0;list:string[]=[];
 @Input('it') set v(x:Item){this.it=x;this.stage=0;const base=(x.img||'assets/menu_images/'+x.id).replace(/\.(jpe?g|png|webp)$/i,'');
  this.list=[...(x.img?[x.img]:[]),...['jpg','jpeg','png','webp'].map(e=>base+'.'+e),PLACEHOLDER_IMG];}}

@Component({selector:'yl-quote',standalone:true,template:`<div class="quote">❝ {{q}} ❞</div>`})
export class Q{q='';@Input('k') set k(v:string){const a=QUOTES[v]||[];this.q=a[Math.floor(Math.random()*a.length)]||'';}}

@Component({selector:'yl-map',standalone:true,imports:[Safe],template:`
<div class="card mapbox"><h2>📍 Visit Yellove Dessert – Rathinam</h2>
<iframe [src]="embed|safe" loading="lazy" allowfullscreen></iframe>
<p class="c"><a class="btn" [href]="url" target="_blank">Open in Google Maps</a></p></div>`})
export class MapBox{embed=MAP_EMBED;url=MAP_URL;}
