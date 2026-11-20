import {Injectable,NgZone,inject} from '@angular/core';
import {initializeApp} from 'firebase/app';
import {getDatabase,ref,onValue,set,Database} from 'firebase/database';
import {getAuth,signInWithEmailAndPassword,Auth} from 'firebase/auth';
import {Item,ITEMS} from './data';
import {FIREBASE,ADMIN_EMAIL} from './extras';
export type MItem=Item&{fresh?:boolean};
export interface MenuState{off:number[];custom:MItem[]}
@Injectable({providedIn:'root'})
export class MenuService{
 st:MenuState=JSON.parse(localStorage.getItem('yl_menu')||'null')||{off:[],custom:[]};
 live=!!FIREBASE.databaseURL;err='';db?:Database;auth?:Auth;zone=inject(NgZone);
 constructor(){if(this.live){const app=initializeApp(FIREBASE);this.db=getDatabase(app);this.auth=getAuth(app);
  onValue(ref(this.db,'menu'),s=>this.zone.run(()=>{const d=s.val();this.st={off:d?.off||[],custom:d?.custom||[]};localStorage.setItem('yl_menu',JSON.stringify(this.st));}));}}
 get all():MItem[]{return [...ITEMS,...this.st.custom];}
 get visible(){return this.all.filter(i=>!this.st.off.includes(i.id));}
 get fresh(){return this.visible.filter(i=>i.fresh);}
 on(id:number){return !this.st.off.includes(id);}
 toggle(id:number){const o=this.st.off;this.st.off=o.includes(id)?o.filter(x=>x!==id):[...o,id];this.save();}
 add(it:Omit<MItem,'id'>){const id=Math.max(1000,...this.st.custom.map(c=>c.id+1));this.st.custom=[...this.st.custom,{...it,id,fresh:true}];this.save();}
 remove(id:number){this.st.custom=this.st.custom.filter(c=>c.id!==id);this.st.off=this.st.off.filter(x=>x!==id);this.save();}
 async save(){this.err='';const data=JSON.parse(JSON.stringify(this.st));localStorage.setItem('yl_menu',JSON.stringify(data));
  if(this.db){try{await set(ref(this.db,'menu'),data);}catch{this.err='Could not save to Firebase. Log out and log in again as admin, and check the database rules.';}}}
 // admin password is checked by Firebase Authentication (never stored in the code)
 async signIn(pw:string){if(!this.auth)return true;try{await signInWithEmailAndPassword(this.auth,ADMIN_EMAIL,pw);return true;}catch{return false;}}
}
