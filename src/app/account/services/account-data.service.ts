import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseHttpService } from '@shared/data-access/base-http.service';
import { userOrder } from '@shared/interfaces/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountDataService extends BaseHttpService{

  constructor() {
    super();
  }

  getUserOrders(id: number): Observable<userOrder[]> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.get<userOrder[]>(this.apiUrl + 'usuarios/data.php', { params });
  }
}
