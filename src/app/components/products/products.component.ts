import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../services/api-service";
import {ProductsService} from "../../services/products.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  categories: any[] = []
  chosenCategory: string = 'All'

  allProducts: any[] = []
  pagedProducts: any[] = []; // Array to hold the products for the current page
  currentPage: number = 1; // Current page index
  limit: number = 8; // Limit of products per page
  totalPages: number = 1; // Total number of pages
  pages: number[] = [];
  isProductsLoading: boolean = true

  sortByValues: string[] = [
    'Price: High',
    'Price: Low',
    'Name: ASC',
    'Name: DSC'
  ]
  chosenSortBy: string = 'Default'

  searchKeyword?: string

  constructor(private apiService: ApiService, private productsService: ProductsService) { }

  ngOnInit(): void {
    this.getCategories()
    this.getAllProducts()
  }

  getCategories() {
    this.apiService.getCategories().subscribe(
      data => {
        this.categories = data
      },
      error => {
        console.log('Error: ', error)
      }
    )
  }

  chooseCategory(category: string): any {
    let categoryId:number = 0
    this.chosenCategory = category
    this.chosenSortBy = 'Default'
    if (category === 'All') {
      this.getAllProducts()
    } else {
      for (let i = 0; i < this.categories.length; i++) {
        const o = this.categories[i];
        if (o.name === category) {
          categoryId = o.id;
          break;  // Exits the loop as soon as the match is found
        }
      }

      this.apiService.getProductsByCategoryId(categoryId).subscribe({
        next:(value => {
          this.getProducts(value)
          this.currentPage = 1
        }),
        error:(err => {
          this.allProducts = []
        })
      })
    }
  }

  chooseSortBy(chosen: string) {
    this.chosenSortBy = chosen
    // this.chooseCategory(this.chosenCategory)
    let sortedProducts: any[] = []
    if (this.allProducts.length > 0) {
      switch (chosen) {
        case 'Default':
          sortedProducts = this.allProducts.sort((a, b) => a.id - b.id)
          break
        case 'Price: High':
          sortedProducts = this.allProducts.sort((a, b) => b.price - a.price)
          break
        case 'Price: Low':
          sortedProducts = this.allProducts.sort((a, b) => a.price - b.price)
          break
        case 'Name: ASC':
          sortedProducts = this.allProducts.sort((a, b) => a.title.localeCompare(b.title))
          break
        case 'Name: DSC':
          sortedProducts = this.allProducts.sort((a, b) => b.title.localeCompare(a.title))
          break
      }

      this.currentPage = 1
      this.getProducts(sortedProducts)
    }
  }

  getProducts(products: any) {
    this.allProducts = products
    this.totalPages = Math.ceil(this.allProducts.length / this.limit)
    this.createPageArray(); // Create page numbers
    this.setPage(this.currentPage)
  }

  getAllProducts(): any {
    this.apiService.getAllProducts().subscribe({
      next:(value => {
        this.getProducts(value)
      }),
      error:(err => {
        this.allProducts = []
      })
    })
  }

  // Set the products to be displayed for the current page
  setPage(page: number) {
    this.isProductsLoading = true
    this.currentPage = page;
    const startIndex = (page - 1) * this.limit;
    const endIndex = startIndex + this.limit;
    this.pagedProducts = this.allProducts.slice(startIndex, endIndex);
    setTimeout(() => {
      this.isProductsLoading = false
    }, 1000)
  }

  // Move to the next page
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.setPage(this.currentPage + 1);
    }
  }

  // Move to the previous page
  previousPage() {
    if (this.currentPage > 1) {
      this.setPage(this.currentPage - 1);
    }
  }

  // Create an array of page numbers to display in pagination
  createPageArray() {
    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i); // Adding page numbers to the pages array
    }
  }

  searchByKeyword(event?: Event) {
    event?.preventDefault()
    let searchedProducts: any[] = []
    if (this.searchKeyword !== undefined && this.searchKeyword.trim()) {
      const keyword = this.searchKeyword.toLowerCase()
      searchedProducts = this.allProducts.filter(product => {
        return (
          product.title.toLowerCase().includes(keyword) ||
          product.description.toLowerCase().includes(keyword) ||
          product.price.toString().includes(keyword)
        )
      })

      this.currentPage = 1
      this.getProducts(searchedProducts)
    }
  }

  onKeywordChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (!inputElement.value) {
      this.currentPage = 1
      this.getAllProducts()
    }
  }
}
