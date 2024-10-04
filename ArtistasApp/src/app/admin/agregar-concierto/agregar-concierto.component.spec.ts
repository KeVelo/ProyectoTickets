import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarConciertoComponent } from './agregar-concierto.component';

describe('AgregarConciertoComponent', () => {
  let component: AgregarConciertoComponent;
  let fixture: ComponentFixture<AgregarConciertoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarConciertoComponent]
    });
    fixture = TestBed.createComponent(AgregarConciertoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
