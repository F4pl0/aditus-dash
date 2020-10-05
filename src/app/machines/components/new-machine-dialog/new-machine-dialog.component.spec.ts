import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMachineDialogComponent } from './new-machine-dialog.component';

describe('NewMachineDialogComponent', () => {
  let component: NewMachineDialogComponent;
  let fixture: ComponentFixture<NewMachineDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewMachineDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMachineDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
