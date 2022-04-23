import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSegment } from '@angular/router';
import { HomeModule } from './pages/home/home.module';

const allowedRoutes = ['home', 'home2', 'home3'];

export const urlMatcher = (url: UrlSegment[]) => {
  if (url.length > 0) {
    const path = url.map(segment => segment.path).join('/');
    if (allowedRoutes.includes(path)) {
      return({consumed: url});
    }
  }
  return null;
}

const routes: Routes = [
  { matcher: urlMatcher, loadChildren: () => HomeModule},
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: '**', loadChildren: () => HomeModule}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
