import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementCardComponent } from './management-card.component';

describe('ManagementCardComponent', () => {
  let component: ManagementCardComponent;
  let fixture: ComponentFixture<ManagementCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
