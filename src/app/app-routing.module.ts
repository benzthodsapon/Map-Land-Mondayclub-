import { DummyComponent } from './dummy/dummy.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'home', component: DummyComponent },
  { path: 'services', component: DummyComponent },
  { path: 'projects', component: DummyComponent },
  { path: 'aboutus', component: DummyComponent },
  { path: 'signup', component: DummyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
