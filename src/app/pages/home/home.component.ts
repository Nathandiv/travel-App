import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FooterComponent } from '../../UI/shared-UI/footer/footer.component';
import { NavComponent } from '../../UI/shared-UI/nav/nav.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule,FooterComponent, NavComponent,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
 
export class HomeComponent implements OnInit {
  public items: any[] = [];
  private http = inject(HttpClient);
  paginatedFlags: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 27; 
  totalPages: number = 0;
  constructor(){
    this.fetchDetails()
  }

  title = 'project';

  ngOnInit(): void {
    this.fetchDetails()
  }


public fetchDetails() {
  this.http.get<{items: any[ ] }>('https://restcountries.com/v3.1/all').subscribe((resp:any)=>{
  console.log(resp)
  this.items = resp;
  this.totalPages = Math.ceil(this.items.length / this.itemsPerPage);
  this.updatePaginatedProducts();

})
}
updatePaginatedProducts() {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  this.paginatedFlags = this.items.slice(startIndex, startIndex + this.itemsPerPage);
}
nextPage() {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
    this.updatePaginatedProducts();
  }
}

prevPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
    this.updatePaginatedProducts();
  }
}
 
}
