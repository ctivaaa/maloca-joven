import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Productions } from './productions';

describe('Productions', () => {
  let component: Productions;
  let fixture: ComponentFixture<Productions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Productions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Productions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
