import {Component,OnDestroy,ViewChild,ElementRef,AfterViewInit,HostListener} from '@angular/core';
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

@Component({selector:'g-snake',standalone:true,template:`
<p class="c">Steer the snake to eat desserts: <b>+10 points</b> each. You get <b>3 lives per day</b> – hitting a wall or yourself costs one.</p>
<p class="c big">{{'❤️'.repeat(lives)}}{{'🖤'.repeat(3-lives)}} · 🍰 {{ate}} eaten · +{{ate*10}} pts</p>
<canvas #cv width="300" height="300" class="snake" (touchstart)="ts($event)" (touchend)="te($event)"></canvas>
<div class="pad"><button class="btn" (click)="turn(0,-1)">⬆️</button><br><button class="btn" (click)="turn(-1,0)">⬅️</button><button class="btn" (click)="turn(0,1)">⬇️</button><button class="btn" (click)="turn(1,0)">➡️</button></div>
<p class="c msg">{{msg}} @if(!run&&lives>0){<button class="btn" (click)="start()">{{msg?'Play again':'Start'}}</button>}</p>`})
export class Snake implements AfterViewInit,OnDestroy{
 @ViewChild('cv') cv!:ElementRef<HTMLCanvasElement>;
 N=15;C=20;body:{x:number;y:number}[]=[];d={x:1,y:0};nd={x:1,y:0};food={x:5,y:5,e:'🍰'};ate=0;run=false;msg='';lives=3;t:any;tx=0;ty=0;
 em=['🍰','🧇','🍩','🍪','🍫','🍨','🧁','🍓'];
 constructor(private s:Store){const k=this.key(),r=JSON.parse(localStorage.getItem(k)||'null');this.lives=r&&r.day===new Date().toDateString()?r.lives:3;
  if(this.lives<=0)this.msg='No lives left today – come back tomorrow! 🌙';}
 key(){return 'yl_snake_'+this.s.user!.phone;}
 ngAfterViewInit(){this.draw();}ngOnDestroy(){clearInterval(this.t);}
 start(){if(this.lives<=0)return;this.body=[{x:7,y:7},{x:6,y:7},{x:5,y:7}];this.d={x:1,y:0};this.nd={x:1,y:0};this.ate=0;this.msg='';this.run=true;this.place();
  clearInterval(this.t);this.t=setInterval(()=>this.tick(),150);}
 place(){let p:{x:number;y:number};do{p={x:Math.floor(Math.random()*this.N),y:Math.floor(Math.random()*this.N)};}while(this.body.some(b=>b.x===p.x&&b.y===p.y));
  this.food={...p,e:this.em[Math.floor(Math.random()*this.em.length)]};}
 turn(x:number,y:number){if(!this.run||(x===-this.d.x&&y===-this.d.y))return;this.nd={x,y};}
 @HostListener('window:keydown',['$event']) key_(e:KeyboardEvent){const m:any={ArrowUp:[0,-1],ArrowDown:[0,1],ArrowLeft:[-1,0],ArrowRight:[1,0]};
  if(this.run&&m[e.key]){e.preventDefault();this.turn(m[e.key][0],m[e.key][1]);}}
 ts(e:TouchEvent){this.tx=e.touches[0].clientX;this.ty=e.touches[0].clientY;}
 te(e:TouchEvent){const dx=e.changedTouches[0].clientX-this.tx,dy=e.changedTouches[0].clientY-this.ty;
  if(Math.abs(dx)>Math.abs(dy))this.turn(dx>0?1:-1,0);else this.turn(0,dy>0?1:-1);}
 tick(){this.d=this.nd;const h={x:this.body[0].x+this.d.x,y:this.body[0].y+this.d.y};
  if(h.x<0||h.y<0||h.x>=this.N||h.y>=this.N||this.body.some(b=>b.x===h.x&&b.y===h.y))return this.die();
  this.body.unshift(h);
  if(h.x===this.food.x&&h.y===this.food.y){this.ate++;this.s.addPoints(10);this.place();}else this.body.pop();
  this.draw();}
 die(){clearInterval(this.t);this.run=false;this.lives--;localStorage.setItem(this.key(),JSON.stringify({day:new Date().toDateString(),lives:this.lives}));
  this.msg=this.lives>0?`Ouch! You ate ${this.ate} and earned ${this.ate*10} points. ${this.lives} life(s) left today.`:`You earned ${this.ate*10} points. No lives left today – come back tomorrow! 🌙`;this.draw();}
 draw(){const c=this.cv?.nativeElement.getContext('2d');if(!c)return;c.clearRect(0,0,300,300);c.font='18px serif';c.textBaseline='middle';c.textAlign='center';
  c.fillText(this.food.e,this.food.x*20+10,this.food.y*20+11);
  this.body.forEach((b,i)=>{c.fillStyle=i?'#8d5524':'#3b1f0e';c.beginPath();c.roundRect(b.x*20+1,b.y*20+1,18,18,5);c.fill();});}}

@Component({standalone:true,imports:[Snake,Memory,Whack,Simon,Odd,HiLo,Q],template:`
<h1 class="ttl">Play & Win</h1><yl-quote k="game"/><p class="c">⭐ {{s.points}} points · win-games pay once a day per game · Snake pays 10 points per dessert</p>
<div class="tabs">@for(g of games;track g.k){<button class="btn" [class.alt]="cur!==g.k" (click)="cur=g.k">{{g.n}}</button>}</div>
@switch(cur){@case('memory'){<g-memory/>}@case('whack'){<g-whack/>}@case('simon'){<g-simon/>}@case('odd'){<g-odd/>}@case('hilo'){<g-hilo/>}@case('snake'){<g-snake/>}}`})
export class Game{cur='memory';games=[{k:'memory',n:'🧠 Memory Match'},{k:'whack',n:'🧇 Waffle Whack'},{k:'simon',n:'🍓 Fruit Simon'},{k:'odd',n:'🔍 Odd One Out'},{k:'hilo',n:'🃏 Higher/Lower'},{k:'snake',n:'🐍 Dessert Snake'}];constructor(public s:Store){}}
