import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditModalProductComponent } from './edit-modal-product.component';

describe('EditModalProductComponent', () => {
  let component: EditModalProductComponent;
  let fixture: ComponentFixture<EditModalProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditModalProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditModalProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
