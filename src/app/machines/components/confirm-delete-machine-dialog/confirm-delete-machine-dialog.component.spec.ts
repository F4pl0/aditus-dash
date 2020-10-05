import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteMachineDialogComponent } from './confirm-delete-machine-dialog.component';

describe('ConfirmDeleteMachineDialogComponent', () => {
  let component: ConfirmDeleteMachineDialogComponent;
  let fixture: ComponentFixture<ConfirmDeleteMachineDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDeleteMachineDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDeleteMachineDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
