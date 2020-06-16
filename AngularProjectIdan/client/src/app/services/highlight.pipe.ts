import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser'

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer){}

  transform(Items: any, searchText: string): any[] {
    console.log('lists', Items);
    console.log('searchText', searchText);
    
    if (!Items) { return []; }
    //to remove highlighted tags before any processing
    Items = Items.map(function (item) {
      item.product_name = item.product_name ? String(item.product_name).replace(/<[^>]+>/gm, '') : '';
      return item;
    })
    if (!searchText) { return Items; }
    
    const re = new RegExp(searchText, 'gi');
    const value = Items
      .map(function (item) {
        //this will match the values and add the highlight tag for it
        item.product_name = item.product_name.replace(re, `<span class='yellow'>` + searchText + `</span>`);
        return item
      }); 
    return value
  }
}


