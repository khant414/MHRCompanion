import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevpostformsComponent } from './devpostforms.component';

describe('DevpostformsComponent', () => {
  let component: DevpostformsComponent;
  let fixture: ComponentFixture<DevpostformsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevpostformsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevpostformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
