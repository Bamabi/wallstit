import { Component, OnInit, Input,  ViewEncapsulation } from '@angular/core';
import { PostitModel } from './postit.model';
import { PostitsService } from './postits.service';
import { ListFormParams } from '../core/list-form-params';


@Component({
  selector: 'app-postits',
  templateUrl: './postits.component.html',
  styleUrls: ['./postits.component.scss'],
})
export class PostitsComponent implements OnInit {

  @Input()
  postit: PostitModel

  constructor(
    private postitsService: PostitsService,
  ) { }

  ngOnInit() {
    console.log(this.postit);
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
    return this.postitsService.allCount();
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
