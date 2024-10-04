import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleListaComponent } from './detalle-lista.component';

describe('DetalleListaComponent', () => {
  let component: DetalleListaComponent;
  let fixture: ComponentFixture<DetalleListaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleListaComponent]
    });
    fixture = TestBed.createComponent(DetalleListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
