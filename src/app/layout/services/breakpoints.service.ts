import {inject, Injectable} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {distinctUntilChanged, map, Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreakpointsService {
  private _breakpointObserver = inject(BreakpointObserver);
  Breakpoints = Breakpoints;

  readonly isMobile$: Observable<boolean> = this._breakpointObserver
    .observe([
      Breakpoints.XSmall,
    ])
    .pipe(
      distinctUntilChanged(),
      map((breakpoint) => breakpoint.matches),
      tap((isMobile)=> console.log('isMobile: ', isMobile))
    );

  readonly isTablet$: Observable<boolean> = this._breakpointObserver
    .observe([
      Breakpoints.Small,
      Breakpoints.Medium
    ])
    .pipe(
      distinctUntilChanged(),
      map((breakpoint) => breakpoint.matches),
      tap((isMobile)=> console.log('isTablet: ', isMobile))
    );

  readonly isDesktop$: Observable<boolean> = this._breakpointObserver
    .observe([
      Breakpoints.Large,
      Breakpoints.XLarge
    ])
    .pipe(
      distinctUntilChanged(),
      map((breakpoint) => breakpoint.matches),
      tap((isMobile)=> console.log('isDesktop: ', isMobile))
    );

}
