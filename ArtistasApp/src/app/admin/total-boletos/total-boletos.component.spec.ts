import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalBoletosComponent } from './total-boletos.component';

describe('TotalBoletosComponent', () => {
  let component: TotalBoletosComponent;
  let fixture: ComponentFixture<TotalBoletosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TotalBoletosComponent]
    });
    fixture = TestBed.createComponent(TotalBoletosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
