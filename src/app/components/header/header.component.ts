import { Component, OnInit } from '@angular/core';
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private cartService: CartService) { }

  totalProductsInCart: number = 0

  ngOnInit(): void {
    this.cartService.totalProductsInCart.subscribe({
      next: value => {
        this.totalProductsInCart = value
      }
    })
  }
}
