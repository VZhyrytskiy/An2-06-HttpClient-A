import { NgModule } from '@angular/core';
import { type Routes, type ExtraOptions, PreloadAllModules, RouterModule, type UrlSegment, type UrlSegmentGroup, type Route, type UrlMatchResult } from '@angular/router';

import { AuthGuard, CustomPreloadingStrategyService } from './core';
import { AbcComponent, AboutComponent, LoginComponent, MessagesComponent, PathNotFoundComponent } from './layout';

const routes: Routes = [
  {
    path: 'about',
    component: AboutComponent,
    title: 'About'
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login'
  },
  {
    path: 'admin',
    canLoad: [AuthGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    title: 'Admin'
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
    title: 'Users',
    data: {
      preload: true
    }
  },
  {
    path: 'messages',
    component: MessagesComponent,
    outlet: 'messages'
  },
  {
    component: AbcComponent,
    title: 'Abc Component',
    matcher: (url: UrlSegment[], group: UrlSegmentGroup, route: Route): UrlMatchResult | null => {
      console.log(url, group, route);
      // один фрагмент, который включает 'abc'
      return url.length === 1 && url[0].path.includes('abc') ? ({consumed: url}) : null;
    }
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    // The router will match this route if the URL requested
    // doesn't match any paths for routes defined in our configuration
    path: '**',
    component: PathNotFoundComponent,
    title: 'Page Not Found'
  }
];

const extraOptions: ExtraOptions = {
  preloadingStrategy: CustomPreloadingStrategyService
  // enableTracing: true  // Makes the router log all its internal events to the console.
};

@NgModule({
  imports: [RouterModule.forRoot(routes, extraOptions)],
  // re-export RouterModule in order to have access
  // to its directives in main module.
  exports: [RouterModule]
})
export class AppRoutingModule {}
