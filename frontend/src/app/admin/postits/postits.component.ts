import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { PostitsService } from './../../shared/postit/postit.service';
import { PostitModel } from './../../shared/postit/postit.model';
import { environment } from '../../../environments/environment';
import { BaseMatListComponent } from '../../core/base-mat-list-component';
import { ListFormParams } from '../../core/list-form-params';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-postits',
  templateUrl: './postits.component.html',
  styleUrls: ['./postits.component.scss']
})
export class PostitsComponent extends BaseMatListComponent<PostitModel, ListFormParams> implements OnInit {

  /**
   * Initializes a new instance of the PostitsComponent.
   * @constructor
   * @param {PostitsService} postitsService The application postits service.
   * @param {FormBuilder} formBuilder The angular form builder.
   * @param {NgbModal} modalService The bootstrap modal service.
   */
  constructor(
    private postitsService: PostitsService,
    formBuilder: FormBuilder,
    public confirmDialog: MatDialog,
  ) {
    super(formBuilder, confirmDialog);
  }

  /**
   * Occurred when component initializes.
   * @method
   */
  ngOnInit() {
    // Init the first sort
    this.sort.active = 'date';
    this.sort.direction = 'desc';
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
