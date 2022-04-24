import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AccessItem } from 'src/app/core/model/backend/access-item';
import { AccessService } from 'src/app/core/services/backend/access.service';
import { SharedDataService } from 'src/app/core/services/shared-data.service';
import {
  filter,
  finalize,
  first,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import {
  BehaviorSubject,
  combineLatest,
  firstValueFrom,
  of,
  Subject,
} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  currentPage$ = new BehaviorSubject<AccessItem | undefined>(undefined);

  private unsubscribe = new Subject<boolean>();

  constructor(
    private readonly accessService: AccessService,
    private readonly sharedData: SharedDataService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.refresh();

    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntil(this.unsubscribe)
      )
      .subscribe((e) => {
        this.refresh();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next(true);
    this.unsubscribe.complete();
  }

  async refresh() {
/*     this.sharedData.pageData$
      .pipe(
        takeUntil(this.unsubscribe),
        first(),
        tap((storedPages) => this.updataPageData(storedPages)),
        switchMap((storedPages) =>
          combineLatest([
            of(storedPages),
            this.accessService.getUserData().pipe(takeUntil(this.unsubscribe)),
          ])
        ),
        finalize(() => {
          if (!this.currentPage$.value) {
            this.currentPage$.next({} as AccessItem);
          }
        })
      )
      .subscribe(([storedPages, userPages]) => {
        if (JSON.stringify(storedPages) !== JSON.stringify(userPages)) {
          this.sharedData.setPageData(userPages);
          this.updataPageData(userPages);
        }
      }); */

    const storedPages = await firstValueFrom(this.sharedData.pageData$);
    this.updataPageData(storedPages);

    const userPages = await firstValueFrom(this.accessService.getUserData());
    if (JSON.stringify(storedPages) !== JSON.stringify(userPages)) {
      this.sharedData.setPageData(userPages);
      this.updataPageData(userPages);
    }

    if (!this.currentPage$.value) {
      this.currentPage$.next({} as AccessItem);
    }
  }

  updataPageData(pages: AccessItem[]): void {
    const currentUrl = this.router.url.replace(/^\//, '');
    this.currentPage$.next(pages.find((pages) => pages.url === currentUrl));
  }
}
