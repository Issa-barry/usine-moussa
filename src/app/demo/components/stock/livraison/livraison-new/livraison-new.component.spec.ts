import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivraisonNewComponent } from './livraison-new.component';

describe('LivraisonNewComponent', () => {
  let component: LivraisonNewComponent;
  let fixture: ComponentFixture<LivraisonNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LivraisonNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LivraisonNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
