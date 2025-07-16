import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackingListeComponent } from './packing-liste.component';

describe('PackingListeComponent', () => {
  let component: PackingListeComponent;
  let fixture: ComponentFixture<PackingListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PackingListeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PackingListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
