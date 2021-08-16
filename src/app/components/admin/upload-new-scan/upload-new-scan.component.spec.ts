import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadNewScanComponent } from './upload-new-scan.component';

describe('UploadNewScanComponent', () => {
  let component: UploadNewScanComponent;
  let fixture: ComponentFixture<UploadNewScanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadNewScanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadNewScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
