import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  getCategories(): Observable<any> {
    return this.httpClient.get('https://api.escuelajs.co/api/v1/categories')
  }

  getAllProducts(): Observable<any> {
    return this.httpClient.get('https://api.escuelajs.co/api/v1/products')
  }

  getProducts(offset: number, limit: number): Observable<any> {
    return this.httpClient.get('https://api.escuelajs.co/api/v1/products?offset=' + offset + '&limit=' + limit)
  }

  getProductsByCategoryId(categoryId: number): Observable<any> {
    return this.httpClient.get('https://api.escuelajs.co/api/v1/products/?categoryId=' + categoryId)
  }

  getProductById(id: number): Observable<any> {
    return this.httpClient.get('https://api.escuelajs.co/api/v1/products/' + id)
  }
}
