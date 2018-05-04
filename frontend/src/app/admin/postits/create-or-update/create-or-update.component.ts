import { Component, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { PostitsService } from '../../../shared/postit/postit.service';
import { PostitModel } from '../../../shared/postit/postit.model';

@Component({
  selector: 'app-create-or-update',
  templateUrl: './create-or-update.component.html',
  styleUrls: ['./create-or-update.component.scss']
})
export class CreateOrUpdateComponent implements OnChanges {

  /** Gets or sets the postit model @property {number} */
  @Input() postit: PostitModel;

  /** Gets or sets the postit submitted event @property {number} */
  @Output() postitSubmitted = new EventEmitter();

  /** Gets or sets the filters form group. @property {FormGroup} */
  form: FormGroup;

  /** Gets or sets a value indicating whether form is submitted @property {boolean} */
  isSubmitted = false;

  /**
   * Gets the current edition action
   * @readonly
   * @property {string}
   */
  get action() {
    return this.postit && this.postit.id !== '' ? 'edit' : 'create';
  }

  /**
   * Initializes a new instance of the CreateOrUpdateComponent.
   * @constructor
   * @param {FormBuilder} formBuilder The angular form builder.
   * @param {PostitsService} postitsService The application postit service.
   */
  constructor(
    private formBuilder: FormBuilder,
    private service: PostitsService
  ) {
    this.initialize();
  }

  /**
   * Execute when component is initialized.
   * @method
   */
  initialize() {
    this.form = this.formBuilder.group({
      id: 0,
      date: ['', Validators.required],
      quote: ['', Validators.required],
      author: ['', Validators.required],
      toPerson: [''],
      reply: [''],
      context: ['']
    });
  }

  debugger() {
    debugger
  }

  /**
   * Execute when component input changes.
   * @method
   * @param {SimpleChanges} changes The list of changed input.
   */
  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    if (!this.postit) {
      return;
    }

    this.form.patchValue(this.postit, { onlySelf: true });
  }

  /**
   * Execute when postit click on submit button.
   * @method
   * @param {Event} event The current click event.
   */
  save(event: Event) {
    event.preventDefault();
    this.isSubmitted = true;
    if (!this.form.valid) {
      return;
    }

    this.postitSubmitted.emit(this.form.value);
  }

}
