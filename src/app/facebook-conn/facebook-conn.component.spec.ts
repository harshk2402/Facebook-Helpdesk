import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacebookConnComponent } from './facebook-conn.component';

describe('FacebookConnComponent', () => {
  let component: FacebookConnComponent;
  let fixture: ComponentFixture<FacebookConnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacebookConnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacebookConnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
