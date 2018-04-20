import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostitsComponent } from './postits.component';

describe('PostitsComponent', () => {
  let component: PostitsComponent;
  let fixture: ComponentFixture<PostitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
