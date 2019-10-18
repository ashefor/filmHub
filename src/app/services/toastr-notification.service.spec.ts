import { TestBed } from '@angular/core/testing';

import { ToastrNotificationService } from './toastr-notification.service';

describe('ToastrNotificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToastrNotificationService = TestBed.get(ToastrNotificationService);
    expect(service).toBeTruthy();
  });
});
