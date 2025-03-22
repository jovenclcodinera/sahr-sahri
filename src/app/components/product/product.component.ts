import {Component, Input, OnInit} from '@angular/core';
import {UrlService} from "../../services/url-service";
import {ApiService} from "../../services/api-service";
import {ProductsService} from "../../services/products.service";
import {firstValueFrom} from "rxjs";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input()
  product: any;
  hasImages: boolean = true
  @Input()
  products: any[] = []

  constructor(
    private urlService: UrlService,
    private apiService: ApiService,
    private productService: ProductsService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.checkIfHasImages()
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

  viewProductInfo(productId: number) {
    this.products.filter(product => {
      this.productService.updateViewedProduct(product.id === productId ? product : null)
    })
  }

  addToCart(product: any) {
    this.cartService.addToCart(product)
  }
}
