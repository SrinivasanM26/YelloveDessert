import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {Store} from './store';
import {MenuService,MItem} from './menu';
import {GROUPS} from './data';
import {Pic,Q} from './ui';

@Component({standalone:true,imports:[FormsModule],template:`
@if(!s.isAdmin){<p class="c">This page is for the shop admin only.</p>}@else{
<h1 class="ttl script">Admin – Menu Manager</h1>
<p class="c">Switch ON = shown to customers · OFF = hidden (out of stock). Hidden now: <b>{{m.st.off.length}}</b> · {{m.live?'🟢 Live sync on':'⚪ Saved on this device only'}}</p>@if(m.err){<p class="c err">{{m.err}}</p>}
<div class="card"><h3>➕ Add a new item</h3><div class="form">
 <input placeholder="Item name" [(ngModel)]="f.name"><input type="number" placeholder="Price ₹" [(ngModel)]="f.price"><input type="number" placeholder="Double price ₹ (optional)" [(ngModel)]="f.dbl">
 <select [(ngModel)]="f.cat">@for(c of cats;track c){<option [value]="c">{{c}}</option>}</select>
 <input placeholder="Emoji (e.g. 🍰)" [(ngModel)]="f.emoji"><input placeholder="Image file name in menu_images (optional)" [(ngModel)]="f.img">
 <button class="btn" (click)="add()">Add to menu</button>@if(msg){<small>{{msg}}</small>}</div></div>
<input placeholder="🔎 Search item…" [(ngModel)]="q">
@for(c of cats;track c){@if(list(c).length){<h2 class="cat">{{c}}</h2><div class="card">
 @for(it of list(c);track it.id){<div class="line"><span>{{it.emoji}} {{it.name}} <small>₹{{it.price}}</small> @if(it.fresh){<small class="tag">NEW</small>}</span>
 <span><label class="sw"><input type="checkbox" [checked]="m.on(it.id)" (change)="m.toggle(it.id)"><i></i></label>@if(it.fresh){<button (click)="m.remove(it.id)" title="Delete">🗑</button>}</span></div>}</div>}}}`})
export class Admin{
 cats=GROUPS.flatMap(g=>g.cats);q='';msg='';f={name:'',price:null as number|null,dbl:null as number|null,cat:'Waffles',emoji:'🍽️',img:''};
 constructor(public s:Store,public m:MenuService){}
 list(c:string):MItem[]{const q=this.q.toLowerCase();return this.m.all.filter(i=>i.cat===c&&i.name.toLowerCase().includes(q));}
 add(){const f=this.f;if(!f.name.trim()||!f.price||f.price<=0){this.msg='Enter a name and price';return;}
  this.m.add({name:f.name.trim(),price:+f.price,doublePrice:f.dbl?+f.dbl:undefined,emoji:f.emoji||'🍽️',cat:f.cat,img:f.img?'assets/menu_images/'+f.img.trim():undefined});
  this.msg='Added ✓ – shown in New Arrivals';this.f={...f,name:'',price:null,dbl:null,img:''};}}

@Component({standalone:true,imports:[Pic,Q,RouterLink],template:`
<h1 class="ttl script">✨ New Arrivals</h1><yl-quote k="menu"/>
@if(!m.fresh.length){<p class="c">No new items right now. <a routerLink="/menu/desserts">See the full menu</a></p>}
<div class="grid">@for(it of m.fresh;track it.id){<div class="card item"><span class="tag">NEW</span><pic [it]="it"/><h3>{{it.name}}</h3>
 @if(it.doublePrice){<div class="sz"><button class="btn" (click)="s.add(it,'s')">Single ₹{{it.price}}</button><button class="btn alt" (click)="s.add(it,'d')">Double ₹{{it.doublePrice}}</button></div>}
 @else{<p class="price">₹{{it.price}}</p><button class="btn" (click)="s.add(it,'s')">Add to Cart</button>}</div>}</div>`})
export class NewItems{constructor(public s:Store,public m:MenuService){}}
