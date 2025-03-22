import {Component, OnInit} from '@angular/core';
import {CartService} from "../../services/cart.service";
import Swal from 'sweetalert2'
declare var $: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  productInCart: any[] = []
  totalProductsInCart: number = 0
  totalCost: number = 0

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getProductsInCart.subscribe({
      next: value => {
        this.productInCart = value
        this.totalProductsInCart = value.length
        this.totalCost = value.reduce((sum, o) => sum + (o.quantity * o.price), 0)
      }
    })
  }

  updateQuantity(id: number, doIncrement: boolean) {
    let product: any = this.productInCart.find(o => o.id === id)
    if (product !== undefined) {
      let quantity: number = product.quantity
      if (doIncrement) {
        product.quantity = quantity + 1
      } else {
        product.quantity = quantity - 1
      }
    }

    // remove product if quantity is 0
    if (product.quantity <= 0) {
      this.removeFromCart(id)
    }

    this.cartService.updateProductInCart(product)
  }

  removeFromCart(id: number) {
    this.cartService.removeFromCart(id)
  }

  doCheckout() {
    if (this.totalProductsInCart > 0) {
      Swal.fire({
        title: "Do you want to purchase these products?",
        text: "Once confirmed, you won't be able to revert",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, I confirm"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Products Purchased",
            text: "Thank you for purchasing our products",
            icon: "success"
          }).then(() => {
            $('#modal-lg').modal('hide')
            this.cartService.emptyCart()
          });
        }
      });
    }
  }
}
