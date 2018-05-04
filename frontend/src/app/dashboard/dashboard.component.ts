import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PostitModel } from '../shared/postit/postit.model';
import { PostitsService, PostitFilter } from '../shared/postit/postit.service';
import { BaseListComponent } from '../core/base-list-component';
import { ListFormParams } from '../core/list-form-params';
import { MatDialog } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { BaseMatListComponent } from '../core/base-mat-list-component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent extends BaseListComponent<PostitModel> implements OnInit {

  public display: string;

  private postits: PostitModel[];

  public parameters: PostitFilter;

  /**
   * Initializes a new instance of the dashboard component.
   * @constructor
   * @param {PostitsService} postitsService The application postit service.
   */
  constructor(public postitsService: PostitsService,
    formBuilder: FormBuilder,
    translate: TranslateService,
  ) {
    super(formBuilder, translate);
  }

  ngOnInit() {
    super.ngOnInit();
  }

/**
   * Gets all the element for a page.
   * @method
   * @param {ListFormParams} parameters The current search parameters.
   * @returns {Observable<TEntity[]>}
   */
  getAll(parameters?: ListFormParams) {
    return this.postitsService.all(parameters);
  }

  /**
   * Gets the total number of element.
   * @method
   * @param {string} search The searching terms.
   * @returns {Observable<TotalModel>}
   */
  getTotal(search?: string) {
    return this.postitsService.allCount(search);
  }

  /**
   * Delete an element.
   * @method
   * @param {PostitModel} entity The current entity to delete.
   * @returns {Observable<any>}
   */
  deleteEntity(entity: PostitModel) {
    return this.postitsService.remove(entity.id);
  }

}
