import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AccessItem } from 'src/app/core/model/backend/access-item';
import { AccessService } from 'src/app/core/services/backend/access.service';
import { SharedDataService } from 'src/app/core/services/shared-data.service';
import { filter, first, takeUntil } from 'rxjs/operators';
import { firstValueFrom, Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  currentPages: AccessItem[] | undefined;

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
        console.log(e);
        this.refresh();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next(true);
    this.unsubscribe.complete();
  }

  async refresh() {
    const storedPageData = await firstValueFrom(this.sharedData.pageData$);
    this.updataPageData(storedPageData);

    const userPageData = await firstValueFrom(this.accessService.getUserData());
    if (JSON.stringify(storedPageData) !== JSON.stringify(userPageData)) {
      this.sharedData.setPageData(userPageData);
      this.updataPageData(userPageData);
    }
  }

  updataPageData(pages: AccessItem[]): void {
    console.log('update');
    this.currentPages = pages;
  }
}
