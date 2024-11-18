import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FooterComponent } from '../../UI/shared-UI/footer/footer.component';
import { NavComponent } from '../../UI/shared-UI/nav/nav.component';
import { RouterLink } from '@angular/router';
import { FilterPipe } from '../../filter.pipe';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule,FooterComponent, NavComponent,RouterLink,FilterPipe,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
 
export class HomeComponent implements OnInit {
  public items: any[] = [];
  public paginatedFlags: any[] = [];
  public searchText: string = ''; // Connected to the search bar
  private http = inject(HttpClient);
  currentPage: number = 1;
  itemsPerPage: number = 27;
  totalPages: number = 0;

  ngOnInit(): void {
    this.fetchDetails();
  }

  public fetchDetails() {
    this.http.get('https://restcountries.com/v3.1/all').subscribe((resp: any) => {
      this.items = resp;
      this.totalPages = Math.ceil(this.items.length / this.itemsPerPage);
      this.updatePaginatedProducts();
    });
  }

  private updatePaginatedProducts() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    const filteredItems = this.searchText
      ? new FilterPipe().transform(this.items, this.searchText)
      : this.items;

    this.paginatedFlags = filteredItems.slice(start, end);
  }

  public onSearchChange() {
    this.currentPage = 1; // Reset to the first page when search changes
    this.updatePaginatedProducts();
  }

  public nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedProducts();
    }
  }

  public prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedProducts();
    }
  }

  public trackByFn(index: number, item: any) {
    return item.name.common; // or another unique identifier
  }
}

// imports: [HttpClientModule,FooterComponent, NavComponent,RouterLink],
