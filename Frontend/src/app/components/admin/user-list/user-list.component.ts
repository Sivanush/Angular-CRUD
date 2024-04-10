import { Component } from '@angular/core';
import { HeaderComponent } from '../../constants/header/header.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [HeaderComponent,TableModule,ButtonModule,FormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {

  products: any = [
    {
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5
  },
      {
          id: "1001",
          code: "dsfg45dfg",
          name: "Leather Wallet",
          description: "Product Description",
          image: "leather-wallet.jpg",
          price: 45,
          category: "Accessories",
          quantity: 18,
          inventoryStatus: "INSTOCK",
          rating: 4
      },
      {
          id: "1002",
          code: "gfh34gh3g",
          name: "Smartphone Case",
          description: "Product Description",
          image: "smartphone-case.jpg",
          price: 20,
          category: "Accessories",
          quantity: 30,
          inventoryStatus: "INSTOCK",
          rating: 3
      },
      {
          id: "1003",
          code: "rt456rth4",
          name: "Sunglasses",
          description: "Product Description",
          image: "sunglasses.jpg",
          price: 55,
          category: "Accessories",
          quantity: 12,
          inventoryStatus: "LOWSTOCK",
          rating: 4
      },
      {
          id: "1004",
          code: "kjt54kty7",
          name: "Backpack",
          description: "Product Description",
          image: "backpack.jpg",
          price: 80,
          category: "Bags",
          quantity: 15,
          inventoryStatus: "INSTOCK",
          rating: 5
      }

  ]


  // cols!: any

  // constructor(private productService: ProductService) {}

  // ngOnInit() {
  //     this.productService.getProductsMini().then((data) => {
  //         this.products = data;
  //     });

  //     this.cols = [
  //         { field: 'code', header: 'Code' },
  //         { field: 'name', header: 'Name' },
  //         { field: 'category', header: 'Category' },
  //         { field: 'quantity', header: 'Quantity' }
  //     ];
  // }

}
