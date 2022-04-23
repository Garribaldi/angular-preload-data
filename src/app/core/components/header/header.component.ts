import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private unsubscribe = new Subject<boolean>();

  mainPages: string[] = [];

  constructor(
    private readonly sharedData: SharedDataService
  ) { }

  ngOnInit(): void {
    this.sharedData.pageData$.pipe(takeUntil(this.unsubscribe)).subscribe(
      data => {
        this.mainPages = data.map(val => val.name);
      }
    )
  }

}
