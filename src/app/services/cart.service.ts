import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class CartService {


  productInCart: any[] = []
  private totalProductsInCartSubject = new BehaviorSubject<number>(0)
  totalProductsInCart = this.totalProductsInCartSubject.asObservable()

  private getProductsInCartSubject = new BehaviorSubject<any[]>([]);
  getProductsInCart = this.getProductsInCartSubject.asObservable()

  constructor() { }

  addToCart(product: any) {
    let addToCartFlag = true
    this.productInCart.forEach(o => {
      if (o.id === product.id) {
        o.quantity = o.quantity + 1
        addToCartFlag = false
      }
    })

    if (addToCartFlag) {
      product.quantity = 1
      this.productInCart.push(product)
    }

    this.refreshProductInCart(this.productInCart)

    Swal.fire({
      toast: true,
      position: "bottom-end",
      icon: "success",
      html: "<b>Successfully added to cart</b>",
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
    })
  }

  countProductsInCart(): number {
    return this.productInCart.length
  }

  refreshProductInCart(products: any[]) {
    this.getProductsInCartSubject.next(products)
    this.totalProductsInCartSubject.next(this.countProductsInCart())
  }

  removeFromCart(id: number) {
    this.productInCart = this.productInCart.filter(o => o.id !== id)
    this.refreshProductInCart(this.productInCart)
  }

  updateProductInCart(product: any) {
    let index = this.productInCart.findIndex(o => o.id === product.id)
    if (index !== -1) {
      this.productInCart[index] = product
    }

    this.refreshProductInCart(this.productInCart)
  }

  emptyCart() {
    if (this.productInCart.length > 0) {
      this.productInCart = []
      this.refreshProductInCart(this.productInCart)
    }
  }
}
