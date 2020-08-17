import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionLevelComponent } from './permission-level.component';

describe('PermissionLevelComponent', () => {
  let component: PermissionLevelComponent;
  let fixture: ComponentFixture<PermissionLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissionLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
