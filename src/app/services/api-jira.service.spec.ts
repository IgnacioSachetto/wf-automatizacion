import { TestBed } from '@angular/core/testing';

import { ApiJiraService } from './api-jira.service';

describe('ApiJiraService', () => {
  let service: ApiJiraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiJiraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
