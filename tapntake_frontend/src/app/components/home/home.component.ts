import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ShopService } from 'src/app/services/shop.service';
import { Shop } from '../../shop';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  token = window.sessionStorage.getItem("auth-user") ? JSON.parse(`${window.sessionStorage.getItem('auth-user')}`)  : 0
  currentProduct: Shop = {};
  currentIndex = -1;
  name =""
  
  shops: Shop[] = [];
  constructor( private shopService: ShopService ) { }
  ngOnInit(): void {
    this.getShops()
  }
  

  getShops(): void {
    
    this.shopService.getAll().subscribe({
      next: (data) => {
        this.shops = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    })
  }

 
}
