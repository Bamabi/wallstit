import { OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { TranslateService } from '@ngx-translate/core';
import { ListFormParams } from './list-form-params';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';

import { environment } from '../../environments/environment';
import { ConfirmModalComponent } from '../shared/confirm-modal/confirm-modal.component';

/**
 * Represents the sort class
 * @class
 */
export class Sort {
  /** Gets or sets the sorted column. @property {string} */
  column: string;

  /** Gets or sets the sort direction. @property {string} */
  direction: string;
}

/**
 * Represents the page class for Mat paginator
 * @class
 */
export class MatPage {
  /** The current total number of items being paged. @property {string} */
  length?: number;

  /** The current page index. @property {string} */
  pageIndex: number;

  /** The current page size. @property {string} */
  pageSize: number;
}

export class TotalModel {
  /** Gets or sets the total number of elements. @property {number} */
  count: number;

  // Remove once area api service available
  constructor(count: number) {
    this.count = count;
  }
}

/**
 * Base list component for managing pagination and sorting for a list.
 * @class
 */
export abstract class BaseListComponent<TEntity> implements OnInit, OnDestroy {

    /** To filter the data list */
  @ViewChild('filter') filter: ElementRef;

  /** Gets or sets value indicating whether search on list is enabled. @property {boolean} */
  searchEnabled = true;

  /** Gets or sets the data list. @property {TEntity[]} */
  data: TEntity[];

  /** Gets or sets the filters form group. @property {FormGroup} */
  filterForm: FormGroup;

  /** Gets or sets the list search text input. @property {string} */
  search: string;

  /** Gets or sets the list last search text input. @property {string} */
  lastSearch: string;

  /** Gets or sets the list element total. @property {number} */
  count: number;

  /** Gets or sets the page element limit. @property {number} */
  limit = environment.page.limit;

  /** Gets or sets the current page. @property {number} */
  currentPage = 0;

  /** Gets or sets the sorting list. @property {Sort[]} */
  sorts: Array<Sort> = [];

  /**
   * Gets the string sort list.
   * @method
   * @property {string}
   */
  get sort(): string {
    if (!this.sorts || this.sorts.length === 0) {
      return '';
    }

    return this.sorts.map(item => item.column + ':' + item.direction).join(',');
  }

  /**
   * Initializes a new instance of the {BaseListComponent}
   * @constructor
   * @param {FormBuilder} formBuilder The angular form builder.
   * @param {NgbModal} modalService The bootstrap modal service.
   * @param {ToastrService} toastr The angular toastr.
   * @param {TranslateService} translate The angular translate service.
   */
  constructor(
    protected formBuilder: FormBuilder,
    protected translate: TranslateService,
  ) {
  }

  /**
   * Occurred when component initializes.
   * @method
   */
  ngOnInit() {
    const params: ListFormParams = {
      sort: this.sort,
      page: this.currentPage,
      limit: this.limit
    };

    // if search enabled add form serach param
    if (this.searchEnabled) {
      params.search = '';
    }

    this.filterForm = this.formBuilder.group(params);
    this.filterForm.setValue(params);

    this.initTable();

    this.filterForm.valueChanges
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(parameters => {
        this.getTotal(parameters.search).subscribe(result => this.count = result.count);

        return this.getAll(parameters);
      })
      .subscribe(data => {
        this.data = data;
        this.currentPage = this.filterForm.value.page;
      });

    if (this.filter !== undefined) {
      Observable.fromEvent(this.filter.nativeElement, 'keyup')
          .debounceTime(150)
          .distinctUntilChanged()
          .subscribe(() => {
              if (!this.filterForm) { return; }
              this.filterForm.controls['search'].setValue(this.filter.nativeElement.value);
          });
    }
  }

  /**
   * Occurred when component initializes.
   * @method
   */
  ngOnDestroy() {
  }

  /**
   * Initializes the list table.
   * @method
   */
  initTable() {
    this.getTotal(this.filterForm.value.search).subscribe(result => {
      this.count = result.count
    });
    this.getAll(this.filterForm.value).subscribe(result => this.data = result);
  }

  /**
   * Gets all the element for a page.
   * @method
   * @param {ListFormParams} parameters The current search parameters.
   * @returns {Observable<TEntity[]>}
   */
  abstract getAll(parameters?: ListFormParams): Observable<TEntity[]>;

  /**
   * Gets the total number of element.
   * @method
   * @param {string} search The searching terms.
   * @returns {Observable<TotalModel>}
   */
  abstract getTotal(search?: string): Observable<TotalModel>;

  /**
   * Gets the sort direction for a column.
   * @method
   * @param {string} column The column name to sort.
   */
  getSortDirection(column: string) {
    const sort = this.sorts.find(item => item.column === column);
    return sort ? sort.direction : '';
  }

  /**
   * Order list by columns.
   * @method
   * @param {string} column Sorting column.
   */
  orderListBy(column: string) {
    const sort = this.sorts.find(item => item.column === column);
    if (!sort) {
      // add new sorts columns
      this.sorts.push({ column: column, direction: 'asc' });
    } else if (sort.direction === 'asc') {
      sort.direction = 'desc';
    } else {
      const index = this.sorts.indexOf(sort);
      this.sorts.splice(index, 1);
    }

    this.currentPage = 0;
    this.filterForm.patchValue({ page: this.currentPage, sort: this.sort });
  }

  /**
   * Occurrend when page changed.
   * @method
   * @param {number} pageIndex The new page index.
   */
  onPaginateChange(page: MatPage) {
    this.currentPage = page.pageIndex;
    this.limit = page.pageSize;
    this.filterForm.patchValue({ page: page.pageIndex, limit: page.pageSize });
  }
}


