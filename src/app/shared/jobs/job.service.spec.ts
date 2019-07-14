import { TestBed } from '@angular/core/testing';

import { JobService } from './job.service';

describe('JobService', () => {
    let service: JobService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.get(JobService);
    });

    it('JS001 - should be created', () => {
        // Arrange
        // Act
        // Assert
        expect(service).toBeTruthy();
    });

    it('JS002 - should have a store name of "jobs" ', () => {
        // Arrange

        // Act

        // Assert
        expect(service['storeName']).toEqual('jobs');
    });
});
