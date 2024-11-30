import { TestBed } from '@angular/core/testing';

import { ConciertosService } from './conciertos.service';

describe('ConciertosService', () => {
  let service: ConciertosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConciertosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
