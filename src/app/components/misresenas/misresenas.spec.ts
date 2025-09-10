import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Misresenas } from './misresenas';

describe('Misresenas', () => {
  let component: Misresenas;
  let fixture: ComponentFixture<Misresenas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Misresenas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Misresenas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
