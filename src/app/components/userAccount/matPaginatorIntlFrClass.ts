import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';

@Injectable()
export class MatPaginatorIntlFr extends MatPaginatorIntl {
  translate: TranslateService;
  firstPageLabel = 'Première page';
  itemsPerPageLabel = 'Items par page';
  lastPageLabel = 'Dernière page';
  nextPageLabel = 'Page suivante';
  previousPageLabel = 'Page précédente';
  getRangeLabel = (page: number, pageSize: number, length: number): string => {
    const of = this.translate ? this.translate.instant('mat-paginator-intl.of') : 'sur';
    if (length === 0 || pageSize === 0) {
      return '0 ' + of + ' ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = ((page * pageSize) > length) ?
      (Math.ceil(length / pageSize) - 1) * pageSize:
      page * pageSize;

    const endIndex = Math.min(startIndex + pageSize, length);
    return startIndex + 1 + ' - ' + endIndex + ' ' + of + ' ' + length;
  };

  injectTranslateService(translate: TranslateService) {
    this.translate = translate;

    this.translate.onLangChange.subscribe(() => {
      this.translateLabels();
    });

    this.translateLabels();
  }

  translateLabels() {
    this.firstPageLabel = this.translate.instant('mat-paginator-intl.first_page');
    this.itemsPerPageLabel = this.translate.instant('mat-paginator-intl.items_per_page');
    this.lastPageLabel = this.translate.instant('mat-paginator-intl.last_page');
    this.nextPageLabel = this.translate.instant('mat-paginator-intl.next_page');
    this.previousPageLabel = this.translate.instant('mat-paginator-intl.previous_page');
  }
}
