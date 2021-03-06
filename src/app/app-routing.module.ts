import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogComponent } from './smart/log/log.component';


const routes: Routes = [
  {path: '', component: LogComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
