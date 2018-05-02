import { Injectable } from '@angular/core';
import { Headers, URLSearchParams } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';
import { ListFilterParams } from '../models/list-filter-params';
import { PostitModel } from './postit.model';

/**
 * Represents the postit list filter.
 * @class
 */
export class PostitFilter extends ListFilterParams {
  search?: string;
}

/**
 * Represents the postits service.
 * @class
 */
@Injectable()
export class PostitsService {
  /** POST/PUT headers */
  private headers = new Headers({ 'Content-Type': 'application/json' });

  /** Gets the base api url @property {string} */
  private baseUrl = `${environment.apiUrlBase}api/`;

  /**
   * Initializes a new instance of the PostitsService.
   * @constructor
   * @param {AuthHttp} http The authorized http service.
   */
  constructor(private http: AuthHttp) { }

  /**
   * Gets the postit list url params.
   * @method
   * @param {PostitFilter} parameters The page filter parameters.
   * @returns {URLSearchParams}
   */
  getUrlParams(parameters: PostitFilter) {
    const params = new URLSearchParams();
    if ((parameters.search || '') !== '') {
      params.set('search', parameters.search);
    }
    if ((parameters.sort || '') !== '') {
      params.set('sort', parameters.sort);
    }
    params.set('page', parameters.page.toString());
    params.set('limit', parameters.limit.toString());
    return params;
  }

  /**
   * Gets all postits with pagination.
   * @method
   * @param {PostitFilter} parameters The page filter parameters.
   * @return {Observable<PostitModel[]>}
   */
  all(parameters: PostitFilter) {
    const params = this.getUrlParams(parameters);
    return this.http.get(`${this.baseUrl}postits`, { search: params }).map(response => response.json() as PostitModel[]);
  }

  /**
   * Gets the number of postit.
   * @method
   * @return {Observable<{ count: number }>}
   */
  allCount(search: string) {
    const params = new URLSearchParams();
    if ((search || '') !== '') {
      params.set('search', search);
    }

    return this.http.get(`${this.baseUrl}postits/count`, { search: params }).map(response => response.json());
  }

  /**
   * Gets the postit model by its identifier.
   * @method
   * @param {string} postitId The requested postit identifier.
   * @returns {Observable<PostitModel>}
   */
  getById(postitId: string) {
    return this.http.get(`${this.baseUrl}postits/${postitId}`).map(response => response.json() as PostitModel);
  }

  /**
   * Create a new postit.
   * @method
   * @param {PostitModel} data The postit model to create.
   * @return {Observable<PostitModel>}
   */
  create(data: PostitModel) {
    delete data.id;
    return this.http.post(`${this.baseUrl}postits`, JSON.stringify(data), { headers: this.headers })
      .map(response => response.json() as PostitModel);
  }

  /**
   * Update an existing postit.
   * @method
   * @param {PostitModel} data The postit model to update.
   * @return {Observable<PostitModel>}
   */
  update(data: PostitModel) {
    const id = data.id;
    return this.http.put(`${this.baseUrl}postits/${id}`, JSON.stringify(data), { headers: this.headers })
      .map(response => response.json() as PostitModel);
  }

  /**
   * Remove a postit.
   * @method
   * @param {string} id The postit identifier to remove.
   */
  remove(id: string) {
    return this.http.delete(`${this.baseUrl}postits/${id}`, { headers: this.headers })
      .map(response => response.json());
  }
}
