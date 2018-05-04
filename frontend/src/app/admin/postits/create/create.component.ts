import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { PostitModel } from '../../../shared/postit/postit.model';
import { PostitsService } from '../../../shared/postit/postit.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  /** Gets or sets the postit model @property {PostitModel} */
  postit: PostitModel;

  /**
   * Initializes a new instance of the CreateComponent class.
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

  ngOnInit() {
  }

  onPostitSubmitted(data: PostitModel) {
    this.service.create(data).subscribe((response) => {
      this.postit = response;
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }
}
