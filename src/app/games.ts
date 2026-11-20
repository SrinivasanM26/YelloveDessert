import {Component,OnDestroy} from '@angular/core';
import {Store} from './store';
import {Q} from './ui';

@Component({selector:'g-memory',standalone:true,template:`
<p class="c">Match all pairs. A wrong match costs a life. Win = <b>1000 points</b></p>
<p class="c big">{{'❤️'.repeat(lives)}}{{'🖤'.repeat(3-lives)}}</p>
@if(msg){<p class="c msg">{{msg}} <button class="btn" (click)="start()">Play again</button></p>}
<div class="board">@for(c of cards;track $index){<div class="tile" [class.up]="c.up||c.done" (click)="flip(c)">{{c.up||c.done?c.e:'?'}}</div>}</div>`})
export class Memory{
 lives=3;msg='';cards:any[]=[];open:any[]=[];busy=false;constructor(private s:Store){this.start();}
 start(){this.lives=3;this.msg='';this.open=[];const e=['🧇','🍰','🍹','🍨','🍫','🥞','🍓','🍩'];
  this.cards=[...e,...e].sort(()=>Math.random()-.5).map(x=>({e:x,up:false,done:false}));}
 flip(c:any){if(this.busy||c.up||c.done||this.lives<=0||this.msg)return;c.up=true;this.open.push(c);
  if(this.open.length<2)return;const[a,b]=this.open;this.open=[];
  if(a.e===b.e){a.done=b.done=true;if(this.cards.every(x=>x.done))this.msg=this.s.award('memory',1000);return;}
  this.busy=true;this.lives--;setTimeout(()=>{a.up=b.up=false;this.busy=false;if(!this.lives)this.msg='Game over – you lost all 3 lives.';},700);}}

@Component({selector:'g-whack',standalone:true,template:`
<p class="c">Tap the waffles as they pop up! Hit 12 in 20 seconds. Win = <b>500 points</b></p>
<p class="c big">⏱ {{time}}s · 🧇 {{score}}/12</p>
<div class="board3">@for(h of holes;track $index){<div class="tile" (click)="hit($index)">{{h?'🧇':''}}</div>}</div>
<p class="c msg">{{msg}} @if(!run){<button class="btn" (click)="start()">{{msg?'Play again':'Start'}}</button>}</p>`})
export class Whack implements OnDestroy{
 holes:boolean[]=Array(9).fill(false);score=0;time=20;run=false;msg='';a:any;b:any;constructor(private s:Store){}
 start(){this.score=0;this.time=20;this.msg='';this.run=true;this.holes=Array(9).fill(false);
  this.b=setInterval(()=>{this.holes=Array(9).fill(false);this.holes[Math.floor(Math.random()*9)]=true;},750);
  this.a=setInterval(()=>{if(--this.time<=0)this.end(this.score>=12);},1000);}
 hit(i:number){if(!this.run||!this.holes[i])return;this.holes[i]=false;if(++this.score>=12)this.end(true);}
 end(w:boolean){clearInterval(this.a);clearInterval(this.b);this.run=false;this.holes=Array(9).fill(false);this.msg=w?this.s.award('whack',500):'Time up – try again!';}
 ngOnDestroy(){clearInterval(this.a);clearInterval(this.b);}}

@Component({selector:'g-simon',standalone:true,template:`
<p class="c">Watch the fruit sequence, then repeat it. Reach round 6. Win = <b>500 points</b></p>
<p class="c big">{{'❤️'.repeat(lives)}}{{'🖤'.repeat(3-lives)}} · Round {{seq.length}}</p>
<p class="c msg">{{msg}} @if(!started||msg){<button class="btn" (click)="start()">{{started?'Play again':'Start'}}</button>}</p>
<div class="board2">@for(f of fruits;track $index){<div class="tile big" [class.lit]="lit===$index" (click)="tap($index)">{{f}}</div>}</div>`})
export class Simon{
 fruits=['🍓','🍋','🫐','🍏'];seq:number[]=[];pos=0;lit=-1;lives=3;busy=true;msg='';started=false;constructor(private s:Store){}
 start(){this.started=true;this.lives=3;this.seq=[];this.msg='';this.next();}
 next(){this.seq.push(Math.floor(Math.random()*4));this.pos=0;this.play();}
 play(){this.busy=true;this.seq.forEach((n,k)=>{setTimeout(()=>this.lit=n,600*k+400);setTimeout(()=>this.lit=-1,600*k+800);});setTimeout(()=>this.busy=false,600*this.seq.length+400);}
 tap(n:number){if(this.busy||this.msg||!this.started)return;this.lit=n;setTimeout(()=>this.lit=-1,200);
  if(n!==this.seq[this.pos]){if(--this.lives<=0){this.msg='Game over';return;}this.play();this.pos=0;return;}
  if(++this.pos===this.seq.length){if(this.seq.length>=6)this.msg=this.s.award('simon',500);else setTimeout(()=>this.next(),600);}}}

@Component({selector:'g-odd',standalone:true,template:`
<p class="c">Find the odd one out! 8 correct to win <b>500 points</b>. A wrong pick costs a life.</p>
<p class="c big">{{'❤️'.repeat(lives)}}{{'🖤'.repeat(3-lives)}} · ✅ {{score}}/8</p>
@if(msg){<p class="c msg">{{msg}} <button class="btn" (click)="reset()">Play again</button></p>}
<div class="board4">@for(g of grid;track $index){<div class="tile" (click)="pick($index)">{{g}}</div>}</div>`})
export class Odd{
 pairs=[['🍩','🍪'],['🍓','🍒'],['🍋','🍊'],['🧇','🥞'],['🍫','🍬']];grid:string[]=[];odd=0;lives=3;score=0;msg='';
 constructor(private s:Store){this.round();}
 round(){const p=this.pairs[Math.floor(Math.random()*5)],f=Math.random()<.5,a=f?p[0]:p[1],b=f?p[1]:p[0];
  this.odd=Math.floor(Math.random()*16);this.grid=Array.from({length:16},(_,i)=>i===this.odd?b:a);}
 reset(){this.lives=3;this.score=0;this.msg='';this.round();}
 pick(i:number){if(this.msg)return;
  if(i===this.odd){if(++this.score>=8){this.msg=this.s.award('odd',500);return;}}
  else if(--this.lives<=0){this.msg='Game over';return;}
  this.round();}}

@Component({selector:'g-hilo',standalone:true,template:`
<p class="c">Will the next card be higher or lower? Get a 7-card streak to win <b>500 points</b>.</p>
<p class="c big">{{'❤️'.repeat(lives)}}{{'🖤'.repeat(3-lives)}} · 🔥 {{streak}}/7</p>
<div class="board2"><div class="tile big">{{cur}}</div></div>
@if(msg){<p class="c msg">{{msg}} <button class="btn" (click)="reset()">Play again</button></p>}@else{
<p class="c"><button class="btn" (click)="guess(true)">Higher ⬆️</button> <button class="btn alt" (click)="guess(false)">Lower ⬇️</button></p>}
<p class="c">Card was {{last}}</p>`})
export class HiLo{
 cur=this.r();last='–';streak=0;lives=3;msg='';constructor(private s:Store){}
 r(){return 1+Math.floor(Math.random()*13);}
 reset(){this.cur=this.r();this.streak=0;this.lives=3;this.msg='';this.last='–';}
 guess(up:boolean){if(this.msg)return;const n=this.r(),ok=n===this.cur||(up?n>this.cur:n<this.cur);this.last=''+n;this.cur=n;
  if(ok){if(++this.streak>=7)this.msg=this.s.award('hilo',500);}else if(--this.lives<=0)this.msg='Game over';}}

@Component({standalone:true,imports:[Memory,Whack,Simon,Odd,HiLo,Q],template:`
<h1 class="ttl">Play & Win</h1><yl-quote k="game"/><p class="c">⭐ {{s.points}} points · each game's points can be earned once a day</p>
<div class="tabs">@for(g of games;track g.k){<button class="btn" [class.alt]="cur!==g.k" (click)="cur=g.k">{{g.n}}</button>}</div>
@switch(cur){@case('memory'){<g-memory/>}@case('whack'){<g-whack/>}@case('simon'){<g-simon/>}@case('odd'){<g-odd/>}@case('hilo'){<g-hilo/>}}`})
export class Game{cur='memory';games=[{k:'memory',n:'🧠 Memory Match'},{k:'whack',n:'🧇 Waffle Whack'},{k:'simon',n:'🍓 Fruit Simon'},{k:'odd',n:'🔍 Odd One Out'},{k:'hilo',n:'🃏 Higher/Lower'}];constructor(public s:Store){}}
