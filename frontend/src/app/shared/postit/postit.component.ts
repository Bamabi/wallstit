import { Component, OnInit, Input,  ViewEncapsulation } from '@angular/core';
import { PostitModel } from './postit.model';
import { PostitsService } from './postit.service';
import { ListFormParams } from '../../core/list-form-params';


@Component({
  selector: 'app-postit',
  templateUrl: './postit.component.html',
  styleUrls: ['./postit.component.scss'],
})
export class PostitComponent implements OnInit {

  @Input()
  public postit: PostitModel

  constructor(
    private postitsService: PostitsService,
  ) { }

  ngOnInit() {

  }
}
