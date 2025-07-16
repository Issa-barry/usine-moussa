import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivraisonListeComponent } from './livraison-liste.component';

describe('LivraisonListeComponent', () => {
  let component: LivraisonListeComponent;
  let fixture: ComponentFixture<LivraisonListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LivraisonListeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LivraisonListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
