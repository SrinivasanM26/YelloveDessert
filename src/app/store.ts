import {Injectable} from '@angular/core';
import {Item,Reward,TAKEAWAY_CHARGE} from './data';
import {ADMIN} from './extras';
export interface CartLine{item:Item;size:'s'|'d';qty:number}
@Injectable({providedIn:'root'})
export class Store{
 user:{name:string;phone:string}|null=JSON.parse(localStorage.getItem('yl_user')||'null');
 points=0; cart:CartLine[]=[];mode:'dine'|'take'='dine';toast='';tt:any;adminOk=sessionStorage.getItem('yl_admin')==='1';
 get isAdmin(){return !!this.user&&this.adminOk&&this.user.phone===ADMIN.phone&&this.user.name.toLowerCase()===ADMIN.name.toLowerCase();} reward:Reward|null=null;
 constructor(){this.points=this.user?+(localStorage.getItem('yl_pts_'+this.user.phone)||0):0;}
 login(name:string,phone:string){this.user={name,phone};localStorage.setItem('yl_user',JSON.stringify(this.user));this.points=+(localStorage.getItem('yl_pts_'+phone)||0);}
 logout(){this.adminOk=false;sessionStorage.removeItem('yl_admin');localStorage.removeItem('yl_user');this.user=null;this.cart=[];this.reward=null;this.points=0;}
 savePts(){if(this.user)localStorage.setItem('yl_pts_'+this.user.phone,''+this.points);}
 addPoints(n:number){this.points+=n;this.savePts();}
 add(item:Item,size:'s'|'d'='s'){const l=this.cart.find(c=>c.item.id===item.id&&c.size===size);l?l.qty++:this.cart.push({item,size,qty:1});this.toast=item.name+' added to cart ✓';clearTimeout(this.tt);this.tt=setTimeout(()=>this.toast='',1800);}
 change(c:CartLine,d:number){c.qty+=d;if(c.qty<=0)this.cart=this.cart.filter(x=>x!==c);}
 unit(c:CartLine){return c.size==='d'&&c.item.doublePrice?c.item.doublePrice:c.item.price;}
 get count(){return this.cart.reduce((n,c)=>n+c.qty,0);}
 get subtotal(){return this.cart.reduce((n,c)=>n+c.qty*this.unit(c),0);}
 get discount(){return this.reward?.pct?Math.round(this.subtotal*this.reward.pct/100):0;}
 get fee(){return this.mode==='take'?TAKEAWAY_CHARGE:0;}
 get total(){return this.subtotal-this.discount+this.fee;}
 award(key:string,pts:number){const k=`yl_won_${this.user!.phone}_${key}`,d=new Date().toDateString();
  if(localStorage.getItem(k)===d)return 'You won! (Points for this game can be earned once a day.)';
  localStorage.setItem(k,d);this.addPoints(pts);return `🎉 You won ${pts} points!`;}
}
