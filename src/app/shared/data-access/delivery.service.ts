import { Injectable } from '@angular/core';
import { BaseHttpService } from '../../shared/data-access/base-http.service';
import { Observable } from 'rxjs';
import { Comuna, Ciudad, Client, Adress } from '../../shared/interfaces/interfaces';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService extends BaseHttpService {

  getCiudades(): Observable<Ciudad[]> {
    return this.http.get<Ciudad[]>(this.apiUrl + 'ciudades/ciudad.php');
  }

  getComunas(): Observable<Comuna[]> {
    return this.http.get<Comuna[]>(this.apiUrl + 'comunas/comuna.php');
  }

  getComunaByCiudad(ciudad_id: number): Observable<Comuna[]> {
    const params = new HttpParams().set('ciudad_id', ciudad_id.toString());
    return this.http.get<Comuna[]>(this.apiUrl + 'comunas/comuna.php', { params });
  }

  saveClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.apiUrl + 'clientes/cliente.php', client);
  }

  saveShippingAddress(adress: Adress): Observable<Client> {
    return this.http.post<Client>(this.apiUrl + 'clientes/cliente.php', adress);
  }

}
