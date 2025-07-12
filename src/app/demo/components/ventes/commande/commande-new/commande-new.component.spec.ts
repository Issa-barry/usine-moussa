import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeNewComponent } from './commande-new.component';

describe('CommandeNewComponent', () => {
  let component: CommandeNewComponent;
  let fixture: ComponentFixture<CommandeNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommandeNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommandeNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
