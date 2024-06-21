import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeliveryBoyPage } from './delivery-boy.page';

describe('DeliveryBoyPage', () => {
  let component: DeliveryBoyPage;
  let fixture: ComponentFixture<DeliveryBoyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryBoyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
