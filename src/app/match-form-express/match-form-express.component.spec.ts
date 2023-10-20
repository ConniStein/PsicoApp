import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchFormExpressComponent } from './match-form-express.component';

describe('MatchFormExpressComponent', () => {
  let component: MatchFormExpressComponent;
  let fixture: ComponentFixture<MatchFormExpressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatchFormExpressComponent]
    });
    fixture = TestBed.createComponent(MatchFormExpressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
