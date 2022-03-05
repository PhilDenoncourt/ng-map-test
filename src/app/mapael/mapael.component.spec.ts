import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaelComponent } from './mapael.component';

describe('MapaelComponent', () => {
  let component: MapaelComponent;
  let fixture: ComponentFixture<MapaelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapaelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
