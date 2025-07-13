import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitNewComponent } from './produit-new.component';

describe('ProduitNewComponent', () => {
  let component: ProduitNewComponent;
  let fixture: ComponentFixture<ProduitNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProduitNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProduitNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
