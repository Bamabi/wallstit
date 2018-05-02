import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  /**
   * Initializes a new instance of the admin component.
   * @constructor
   * @param {PostitsService} service The application postit service.
   */
  constructor() {
  }

  ngOnInit() {
  }

}
