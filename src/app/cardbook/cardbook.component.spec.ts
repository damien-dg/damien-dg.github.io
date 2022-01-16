/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CardbookComponent } from './cardbook.component';

describe('CardbookComponent', () => {
  let component: CardbookComponent;
  let fixture: ComponentFixture<CardbookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardbookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
