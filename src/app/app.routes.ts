import {Routes} from '@angular/router';
import {Home,Menu,Cart,Updates,Visit} from './pages';
import {Game} from './games';
import {Admin,NewItems} from './admin';
export const routes:Routes=[
 {path:'',component:Home},{path:'menu',redirectTo:'menu/desserts',pathMatch:'full'},{path:'menu/:group',component:Menu},{path:'cart',component:Cart},
 {path:'game',component:Game},{path:'updates',component:Updates},{path:'visit',component:Visit},{path:'admin',component:Admin},{path:'new',component:NewItems},{path:'**',redirectTo:''}];
