import { TestBed } from '@angular/core/testing';

import { Busqueda } from './busqueda';

describe('Buqueda', () => {
  let service: Busqueda;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Busqueda);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
