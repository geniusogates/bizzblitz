import { Pipe, PipeTransform } from '@angular/core';

import { Article, ArticleListConfig } from '../shared/models';
import { ArticlesService } from '../shared/services/articles.service';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  //transform(value: any, args?: any): any {
   // return null;
  //}
  public transform(value, keys: string, term: string) {
    
        if (!term) return value;
        return (value || []).filter((article) => keys.split(',').some(key => article.hasOwnProperty(key) && new RegExp(term, 'gi').test(article[key])));
    
      }

}
