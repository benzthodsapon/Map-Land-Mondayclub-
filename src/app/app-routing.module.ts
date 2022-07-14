import { DummyComponent } from './dummy/dummy.component';
import { MapComponent } from './pages/map/map.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'home', component: DummyComponent },
  { path: 'map', component: MapComponent },
  { path: 'projects', component: DummyComponent },
  { path: 'aboutus', component: DummyComponent },
  { path: 'signup', component: DummyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
