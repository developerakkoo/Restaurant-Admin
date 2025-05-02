import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettlePage } from './settle.page';

describe('SettlePage', () => {
  let component: SettlePage;
  let fixture: ComponentFixture<SettlePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SettlePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
