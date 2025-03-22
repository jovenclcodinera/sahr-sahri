import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {UrlService} from "../../services/url-service";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {

  product: any
  isLoading: boolean = true
  hasImages: boolean = true

  constructor(private productService: ProductsService, private urlService: UrlService, private cartService: CartService) { }

  ngOnInit(): void {
    this.productService.viewedProduct.subscribe({
      next: value => {
        this.isLoading = true
        if (value !== undefined && value !== null) {
          this.product = value
          this.checkIfHasImages()
        }
        setTimeout(() => {
          this.isLoading = false
        }, 1000)
      }
    })
  }

  async checkIfHasImages() {
    if (this.product.images.length <= 0) {
      this.hasImages = false
      return
    }

    let images: string[] = []
    for (const image of this.product.images) {
      const isValid = await this.urlService.isValidImageUrl(image);
      if (isValid) {
        images.push(image)
      }
    }

    this.product.images = images

    this.hasImages = images.length > 0;
  }

  addToCart(product: any) {
    this.cartService.addToCart(product)
  }
}
