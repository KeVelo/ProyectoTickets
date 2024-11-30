import { TestBed } from '@angular/core/testing';

import { NuevoAdminService } from './nuevo-admin.service';

describe('NuevoAdminService', () => {
  let service: NuevoAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NuevoAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
