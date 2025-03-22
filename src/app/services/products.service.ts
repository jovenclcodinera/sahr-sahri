import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  productInfo = new BehaviorSubject<any>(null)
  viewedProduct = this.productInfo.asObservable()

  constructor() { }

  updateViewedProduct(product: any) {
    this.productInfo.next(product); // Emit new data to subscribers
  }
}
