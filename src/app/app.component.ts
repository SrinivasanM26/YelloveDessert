import {Component} from '@angular/core';
import {Router,RouterOutlet,RouterLink,RouterLinkActive} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {Store} from './store';
import {RATING,REVIEWS} from './data';
import {INSTA_URL,MAP_URL,ADMIN} from './extras';
import {MenuService} from './menu';
@Component({selector:'app-root',standalone:true,imports:[RouterOutlet,RouterLink,RouterLinkActive,FormsModule],
template:`
<div class="bg" aria-hidden="true">@for(h of hearts;track $index){<span class="heart" [style.left.%]="h.l" [style.animation-delay.s]="h.d" [style.font-size.px]="h.s" [style.animation-duration.s]="h.t">{{$index%3?'💛':'🤎'}}</span>}</div>
<header class="nav"><a routerLink="/" class="logo"><img src="assets/logo.png" alt="Yellove Dessert"><span>Yellove Dessert</span></a>
 <nav><a routerLink="/" routerLinkActive="on" [routerLinkActiveOptions]="{exact:true}">Home</a><a routerLink="/menu/desserts" routerLinkActive="on">Desserts</a><a routerLink="/menu/fried" routerLinkActive="on">Fried &amp; Snacks</a><a routerLink="/menu/juice" routerLinkActive="on">Juices</a>
 <a routerLink="/game" routerLinkActive="on">Play &amp; Win</a><a routerLink="/updates" routerLinkActive="on">Updates</a>@if(m.fresh.length){<a routerLink="/new" routerLinkActive="on">✨ New</a>}<a routerLink="/visit" routerLinkActive="on">Find Us</a>@if(s.isAdmin){<a routerLink="/admin" routerLinkActive="on">⚙ Admin</a>}
 <a routerLink="/cart" routerLinkActive="on">🛒 Cart</a></nav>
 @if(s.user){<span class="who">{{s.user.name}} · ⭐ {{s.points}} <a (click)="s.logout()">Logout</a></span>}</header>
@if(!s.user){<div class="overlay"><div class="card login"><img src="assets/logo.png" class="llogo" alt=""><h2>Welcome to Yellove 💛</h2><p>Enter your details to start ordering and earning points.</p>
 <input placeholder="Your name" [(ngModel)]="name"><input placeholder="10-digit mobile number" [(ngModel)]="phone" maxlength="10">@if(needPin){<input type="password" placeholder="Admin password" [(ngModel)]="pin">}
 @if(err){<small class="err">{{err}}</small>}<button class="btn" (click)="login()">Continue</button></div></div>}
<main><router-outlet/></main>
<section class="reviews"><h2>What customers say on Google</h2>
 <p class="big">⭐ {{R.score}} <small>({{R.count}} Google reviews)</small> <a [href]="R.mapsUrl" target="_blank">View on Google</a></p>
 <div class="grid">@for(r of RV;track r.name){<div class="card"><div>{{'★'.repeat(r.stars)}}</div><p>{{r.text}}</p><b>{{r.name}}</b></div>}</div></section>
<footer>💛 Yellove Dessert, Rathinam · Taste the love in every bite<br><a [href]="insta" target="_blank">Instagram</a> · <a [href]="map" target="_blank">Google Maps</a> · WhatsApp 9384463160</footer>
@if(s.toast){<div class="toast">{{s.toast}}</div>}
@if(s.count){<a routerLink="/cart" class="fab">🛒 @for(n of [s.count];track n){<b class="pop">{{n}}</b>} item(s) · ₹{{s.total}} <span>View cart ›</span></a>}`})
export class AppComponent{
 name='';phone='';pin='';needPin=false;err='';R=RATING;RV=REVIEWS;insta=INSTA_URL;map=MAP_URL;
 hearts=Array.from({length:20},(_,i)=>({l:(i*37)%100,d:(i*1.7)%12,s:14+(i*7)%26,t:10+(i*3)%9}));
 constructor(public s:Store,public m:MenuService,private r:Router){}
 async login(){
  if(this.name.trim().length<2){this.err='Enter your name';return;}
  if(!/^\d{10}$/.test(this.phone)){this.err='Enter a valid 10-digit number';return;}
  const admin=this.name.trim().toLowerCase()===ADMIN.name.toLowerCase()&&this.phone===ADMIN.phone;
  if(admin&&this.m.live){
   if(!this.needPin){this.needPin=true;this.err='Enter the admin password';return;}
   if(!(await this.m.signIn(this.pin))){this.err='Wrong admin password';return;}}
  this.err='';this.s.login(this.name.trim(),this.phone);
  if(admin){this.s.adminOk=true;sessionStorage.setItem('yl_admin','1');this.r.navigateByUrl('/admin');}}
}
