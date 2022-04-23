import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccessService } from './backend/access.service';
import { SharedDataService } from './shared-data.service';

@Injectable({
  providedIn: 'root'
})
export class AppInitService {

  constructor(
    private readonly accessService: AccessService,
    private readonly sharedData: SharedDataService
  ) { }

  init() {
    return new Observable((subscriber) => {
      this.accessService.getPublicData()
      .subscribe(
        data => {
          this.sharedData.setPageData(data);
          subscriber.complete();
        },
        error => {
          subscriber.error();
        }
      );
    });
  }
}
