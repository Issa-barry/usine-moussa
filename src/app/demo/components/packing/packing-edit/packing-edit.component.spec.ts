import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackingEditComponent } from './packing-edit.component';

describe('PackingEditComponent', () => {
  let component: PackingEditComponent;
  let fixture: ComponentFixture<PackingEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PackingEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PackingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
