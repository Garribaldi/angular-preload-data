import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { AccessItem } from '../../model/backend/access-item';

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  constructor(
    private readonly http: HttpClient
  ) { }

  getPublicData(): Observable<AccessItem[]> {
    const url = 'assets/public.json';
    return this.http.get<AccessItem[]>(url);
  }

  getUserData(): Observable<AccessItem[]> {
    const url = 'assets/user.json';
    return this.http.get<AccessItem[]>(url).pipe(delay(3000));
  }
}
