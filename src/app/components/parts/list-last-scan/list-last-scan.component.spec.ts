import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLastScanComponent } from './list-last-scan.component';

describe('ListLastScanComponent', () => {
  let component: ListLastScanComponent;
  let fixture: ComponentFixture<ListLastScanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListLastScanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLastScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
