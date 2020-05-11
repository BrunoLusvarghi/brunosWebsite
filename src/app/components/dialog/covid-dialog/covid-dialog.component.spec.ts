import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidDialogComponent } from './covid-dialog.component';

describe('CovidDialogComponent', () => {
  let component: CovidDialogComponent;
  let fixture: ComponentFixture<CovidDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CovidDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
