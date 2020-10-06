import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmAdminDialogComponent } from './confirm-admin-dialog.component';

describe('ConfirmAdminDialogComponent', () => {
  let component: ConfirmAdminDialogComponent;
  let fixture: ComponentFixture<ConfirmAdminDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmAdminDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmAdminDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
