import {Component,HostListener,OnInit,OnDestroy} from '@angular/core';
import {RouterLink,ActivatedRoute} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {Store} from './store';
import {MenuService} from './menu';
import {GROUPS,REWARDS,WHATSAPP,TAKEAWAY_CHARGE} from './data';
import {UPI_LINK,INSTA_URL,REEL_LINKS} from './extras';
import {Pic,Q,MapBox,Safe} from './ui';

@Component({standalone:true,imports:[RouterLink,Pic,Q,MapBox],template:`
<section class="brand"><img src="assets/logo.png" alt="Yellove Dessert Rathinam"><div><h1 class="script">Yellove Dessert</h1><p>Taste the love in every bite 💛</p>
 <a class="btn" routerLink="/menu/desserts">Order Now</a> <a class="btn alt" routerLink="/game">Play &amp; Win</a></div></section>
<yl-quote k="home"/>
<section class="hero"><h3>⭐ Must Try</h3>
 @if(cur;as c){<div class="slide"><pic class="big-pic" [it]="c"/><div><h1>{{c.name}}</h1><p class="price">₹{{c.price}}</p>
 <button class="btn" (click)="s.add(c)">Add to Cart</button> <a class="btn alt" routerLink="/menu/desserts">Full Menu</a></div></div>}
 <div class="dots">@for(t of top;track t.id;let k=$index){<span [class.on]="k===i%top.length" (click)="i=k"></span>}</div></section>
<section class="rewards"><h2 class="script">Earn points. Get treats. 🎁</h2><p>Win the games and redeem points in your cart.</p>
 <div class="grid">@for(r of rw;track r.pts){<div class="card"><h3>{{r.pts}} pts</h3><p>{{r.label}}</p></div>}</div>
 <a class="btn" routerLink="/game">Play Now</a></section>
<yl-map/>`})
export class Home implements OnInit,OnDestroy{
 rw=REWARDS;i=0;t:any;constructor(public s:Store,public m:MenuService){}
 get top(){return this.m.visible.filter(x=>x.top);}
 get cur(){const t=this.top;return t.length?t[this.i%t.length]:undefined;}
 ngOnInit(){this.t=setInterval(()=>this.i++,3500);}ngOnDestroy(){clearInterval(this.t);}}

@Component({standalone:true,imports:[Pic,Q],template:`
<h1 class="ttl script">{{g.title}}</h1><yl-quote k="menu"/>
@for(c of g.cats;track c){@if(by(c).length){<h2 class="cat">{{c}}</h2><div class="grid">
@for(it of by(c);track it.id){<div class="card item"><pic [it]="it"/><h3>{{it.name}}</h3>
 @if(it.doublePrice){<div class="sz"><button class="btn" (click)="s.add(it,'s')">Single ₹{{it.price}}</button><button class="btn alt" (click)="s.add(it,'d')">Double ₹{{it.doublePrice}}</button></div>}
 @else{<p class="price">₹{{it.price}}</p><button class="btn" (click)="s.add(it,'s')">Add to Cart</button>}</div>}</div>}}`})
export class Menu{g=GROUPS[0];constructor(public s:Store,public m:MenuService,r:ActivatedRoute){r.paramMap.subscribe(p=>this.g=GROUPS.find(x=>x.slug===p.get('group'))||GROUPS[0]);}
 by(c:string){return this.m.visible.filter(i=>i.cat===c);}}

@Component({standalone:true,imports:[FormsModule,RouterLink,Q],template:`
<h1 class="ttl script">Your Cart</h1><yl-quote k="cart"/>
@if(!s.cart.length){<p class="c">Cart is empty. <a routerLink="/menu/desserts">Browse menu</a></p>}@else{
<div class="two"><div class="card">
 @for(c of s.cart;track c){<div class="line"><span>{{c.item.name}}{{c.size==='d'?' (Double)':''}}</span>
  <span><button (click)="s.change(c,-1)">−</button> {{c.qty}} <button (click)="s.change(c,1)">+</button></span><b>₹{{c.qty*s.unit(c)}}</b></div>}
 <hr><label>Dine-in or Takeaway</label>
 <select [(ngModel)]="s.mode"><option value="dine">Dine-in</option><option value="take">Takeaway (+₹{{tc}})</option></select>
 <label>Redeem points (you have ⭐ {{s.points}})</label>
 <select [(ngModel)]="s.reward"><option [ngValue]="null">No reward</option>
 @for(r of rw;track r.pts){<option [ngValue]="r" [disabled]="s.points<r.pts">{{r.pts}} pts – {{r.label}}</option>}</select>
 <p>Subtotal ₹{{s.subtotal}}</p>@if(s.discount){<p>Discount −₹{{s.discount}}</p>}@if(s.fee){<p>Takeaway charge +₹{{s.fee}}</p>}<h2>Total ₹{{s.total}}</h2></div>
<div class="card paycard"><div class="tabs"><button class="btn" [class.alt]="pay!=='upi'" (click)="pay='upi'">📷 Scan QR</button><button class="btn" [class.alt]="pay!=='cash'" (click)="pay='cash'">💵 Hand Cash</button></div>
 @if(pay==='upi'){<div class="c"><div class="qrbox"><img src="assets/payment-qr.png" alt="Payment QR" (click)="openApp()"></div>
  <p><b>Tap the QR</b> to open your UPI app, enter <b>₹{{s.total}}</b> and pay. (On a computer, scan it with your phone.)</p>
  <p><a class="btn alt" href="assets/payment-qr.png" download="yellove-payment-qr.png">⬇ Save QR</a></p>
  @if(asked){<div class="ask"><p>Did your payment go through?</p><button class="btn" (click)="send(false)">Yes – send my order on WhatsApp</button> <button class="btn alt" (click)="asked=false">Not yet</button></div>}
  @else{<p><button class="btn" (click)="send(false)">I've paid – send order on WhatsApp</button></p>}
  <small>Check the shop name before you pay.</small></div>}
 @else{<div class="c"><div class="cash">💵</div><p>Pay ₹{{s.total}} in cash at the shop.</p><button class="btn" (click)="send(true)">Send order on WhatsApp (Hand Cash)</button></div>}</div></div>}`})
export class Cart{rw=REWARDS;tc=TAKEAWAY_CHARGE;pay:'upi'|'cash'='upi';asked=false;paying=false;constructor(public s:Store){}
 openApp(){this.paying=true;window.location.href=UPI_LINK;}
 @HostListener('document:visibilitychange') back(){if(!document.hidden&&this.paying){this.paying=false;this.asked=true;}}
 send(cash:boolean){const s=this.s;let m=`New Order – Yellove Dessert\n${cash?'Name':'Customer Name'}: ${s.user!.name}\nPhone: ${s.user!.phone}\n`;
  if(s.mode==='take')m+=`Order Type: Takeaway\n`;m+='\n';
  s.cart.forEach(c=>m+=`${c.qty} x ${c.item.name}${c.size==='d'?' (Double)':''} = ₹${c.qty*s.unit(c)}\n`);
  m+='\n';if(s.reward)m+=`Reward: ${s.reward.label} (${s.reward.pts} pts)\n`;
  m+=`Subtotal: ₹${s.subtotal}\nDiscount: ₹${s.discount}\n`;if(s.fee)m+=`Takeaway charge: ₹${s.fee}\n`;
  m+=`Total: ₹${s.total}\n${cash?'(Pay by Hand Cash)':'(Paid via UPI QR)'}`;
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(m)}`,'_blank');
  if(s.reward){s.points-=s.reward.pts;s.savePts();}s.cart=[];s.reward=null;this.asked=false;}}

@Component({standalone:true,imports:[Safe,Q],template:`
<h1 class="ttl script">Latest on Instagram</h1><yl-quote k="updates"/>
<p class="c"><a class="btn" [href]="insta" target="_blank">📸 Follow &#64;yellove_dessert_rathinam</a></p>
@if(reels.length){<h2 class="cat">Latest reels</h2><div class="grid">@for(r of reels;track r){<div class="card vid"><iframe [src]="r|safe" height="520" loading="lazy"></iframe></div>}</div>}
<h2 class="cat">Our Instagram feed</h2><div class="card vid feed"><iframe [src]="feed|safe" height="760" loading="lazy"></iframe></div>`})
export class Updates{insta=INSTA_URL;feed=INSTA_URL+'embed';
 reels=REEL_LINKS.map(u=>u.split('?')[0].replace(/\/?$/,'/')+'embed');}

@Component({standalone:true,imports:[MapBox,Q],template:`<h1 class="ttl script">Find Us</h1><yl-quote k="visit"/><yl-map/>`})
export class Visit{}
