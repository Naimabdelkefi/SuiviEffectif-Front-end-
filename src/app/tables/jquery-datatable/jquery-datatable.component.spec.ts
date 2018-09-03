import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JqueryDatatableComponent } from './jquery-datatable.component';

describe('JqueryDatatableComponent', () => {
  let component: JqueryDatatableComponent;
  let fixture: ComponentFixture<JqueryDatatableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JqueryDatatableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JqueryDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
