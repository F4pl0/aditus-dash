import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCsvDialogComponent } from './view-csv-dialog.component';

describe('ViewCsvDialogComponent', () => {
  let component: ViewCsvDialogComponent;
  let fixture: ComponentFixture<ViewCsvDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCsvDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCsvDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
