import { Component, OnInit } from '@angular/core';
import { PostitModel } from '../postits/postit.model';
import { PostitsService } from '../postits/postits.service';
import { PostitsComponent } from '../postits/postits.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  postits: PostitModel[];
  postitComponent: PostitsComponent;

  /**
   * Initializes a new instance of the admin component.
   * @constructor
   * @param {PostitsService} service The application postit service.
   */
  constructor(
    private postitsService: PostitsService
  ) {
    this.postitComponent = new PostitsComponent(this.postitsService);
  }

  ngOnInit() {
    this.postitComponent.getAll({ search: '', page: 0, limit: 12, sort: 'date:desc'}).subscribe((data: PostitModel[]) => {
      this.postits = data;
    })
  }

}
