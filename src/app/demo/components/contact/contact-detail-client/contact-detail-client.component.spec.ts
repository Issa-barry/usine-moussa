import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDetailClientComponent } from './contact-detail-client.component';

describe('ContactDetailClientComponent', () => {
  let component: ContactDetailClientComponent;
  let fixture: ComponentFixture<ContactDetailClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactDetailClientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactDetailClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
