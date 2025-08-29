import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactNewClientComponent } from './contact-new-client.component';

describe('ContactNewClientComponent', () => {
  let component: ContactNewClientComponent;
  let fixture: ComponentFixture<ContactNewClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactNewClientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactNewClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
