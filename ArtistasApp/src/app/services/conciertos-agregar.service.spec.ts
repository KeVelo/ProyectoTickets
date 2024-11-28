import { TestBed } from '@angular/core/testing';

import { ConciertosAgregarService } from './conciertos-agregar.service';

describe('ConciertosAgregarService', () => {
  let service: ConciertosAgregarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConciertosAgregarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
