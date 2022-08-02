import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/product.service';
import { Product } from '../../product';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ShopService } from 'src/app/services/shop.service';
import { Shop } from 'src/app/shop';

@Component({
  selector: 'app-products',
  templateUrl: './shopmenu.component.html',
  styleUrls: ['./shopmenu.component.css']
})
export class ShopmenuComponent implements OnInit {
  public totalItems :any
  products: Product[] = []
  currentProduct= {}
  currentIndex = -1
  name=""
  currentShop :Shop ={
    name:""
  }
  constructor( private shopService:ShopService, private productService: ProductsService, private route: ActivatedRoute, private cartService: CartService) { }

  ngOnInit(): void {
    this.getAll()
    this.totalItems = this.cartService.getItems()
    this.totalItems.length
    this.getShop(this.route.snapshot.params['id'])
  }
  addToCart(product: Product) {

    this.cartService.addToCart(product);
    
  }

  getAll(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.productService.getAllProducts(id).subscribe({
      next: data => {
        this.products = data
        console.log(data)
      },
      error: e => console.error(e)
    })
  }
  searchName(): void {
    this.currentProduct = {};
    this.currentIndex = -1;

    this.productService.findByTitle(this.name)
      .subscribe({
        next: (data) => {
          this.products = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  getShop(id: string): void {
    this.shopService.get(id)
      .subscribe({
        next: (data) => {
          this.currentShop = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
}