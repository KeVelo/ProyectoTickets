import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleBoletosComponent } from './detalle-boletos.component';

describe('DetalleBoletosComponent', () => {
  let component: DetalleBoletosComponent;
  let fixture: ComponentFixture<DetalleBoletosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleBoletosComponent]
    });
    fixture = TestBed.createComponent(DetalleBoletosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
