import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GalleryComponent } from './gallery/gallery.component';
import { SettingsComponent } from './settings/settings.component';
import { LiveviewComponent } from './liveview/liveview.component';
import { PrinterComponent } from './printer/printer.component';
import { OverlayComponent } from './overlay/overlay.component';
import { StatusComponent } from './status/status.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'gallery',
    component: GalleryComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: 'liveview',
    component: LiveviewComponent
  },
  {
    path: 'printer',
    component: PrinterComponent
  },
  {
    path: 'overlay',
    component: OverlayComponent
  },
  {
    path: 'status',
    component: StatusComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
