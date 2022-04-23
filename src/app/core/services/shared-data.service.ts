import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, interval, ReplaySubject, Subject } from 'rxjs';
import { delay, filter, takeUntil, timeout } from 'rxjs/operators';
import { AccessItem } from '../model/backend/access-item';
import { AccessService } from './backend/access.service';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private pageData = new BehaviorSubject<AccessItem[]>([]);
  pageData$ = this.pageData.asObservable();

  constructor(
    private readonly router: Router,
    private readonly accessService: AccessService
  ) {

  }

  setPageData(data: AccessItem[]) {
    this.pageData.next(data);
  }

/*   private updatePageData(): void {
    this.accessService
      .getUserData()
      .pipe(delay(5000))
      .subscribe((data: AccessItem[]) => {
        const previous = JSON.stringify(this.pageData.value);
        const current = JSON.stringify(data);
        if (previous === current) return;
        this.setPageData(data);
        this.pageData.next(data);
      });
  } */
}
