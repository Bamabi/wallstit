import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { PostitModel } from '../../../shared/postit/postit.model';
import { PostitsService } from '../../../shared/postit/postit.service';
import { MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {

  /** Gets or sets the postit model @property {PostitModel} */
  postit: PostitModel;

  /** Gets or sets the route subscription @property {Subscription} */
  routeSub: Subscription;

  /**
   * Initializes a new instance of the EditComponent class.
   * @constructor
   * @param {ActivatedRoute} route The current activated route.
   * @param {Router} router The angular router service.
   * @param {PostitsService} service The application postit service.
   */
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: PostitsService
  ) { }

  /**
   * Executed on component initializes.
   * @method
   */
  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params: Params) => {
      const postitId = params['id'];
      if (!postitId || postitId.replace(/ /ig, '') === '') {
        this.postit = undefined;
        return;
      }

      this.service.getById(postitId).subscribe(data => {
        this.postit = data;
        this.postit.date = new Date(this.postit.date);
      });
    });
  }

  /**
   * Executed on component destroy.
   * @method
   */
  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  /**
   * Executed on postit submitted.
   * @method
   * @param {PostitModel} data The changed postit model to save.
   */
  onPostitSubmitted(data: PostitModel) {
    console.log('postit saved:', data);
    this.service.update(data).subscribe((response) => {
      this.postit = response;
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }
}
