import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HitZoneComponent } from './hit-zone.component';

describe('HitZoneComponent', () => {
  let component: HitZoneComponent;
  let fixture: ComponentFixture<HitZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HitZoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HitZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
