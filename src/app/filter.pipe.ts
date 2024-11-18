import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLowerCase();

    return items.filter(item => {
      // Check name
      const nameMatch = item.name?.common?.toLowerCase().includes(searchText);

      // Check currencies
      const currencies = item.currencies ? Object.keys(item.currencies).join(' ').toLowerCase() : '';
      const currencyMatch = currencies.includes(searchText);

      // Check languages
      const languages = item.languages ? Object.values(item.languages).join(' ').toLowerCase() : '';
      const languageMatch = languages.includes(searchText);

      return nameMatch || currencyMatch || languageMatch;
    });
  }
}
