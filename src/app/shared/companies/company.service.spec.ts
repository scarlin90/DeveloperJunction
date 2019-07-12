import { TestBed } from '@angular/core/testing';

import { CompanyService } from './company.service';

describe('CompanyService', () => {
    let service: CompanyService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.get(CompanyService);
    });

    it('CS001 - should be created', () => {
        // Arrange
        // Act
        // Assert
        expect(service).toBeTruthy();
    });

    it('CS002 - should have a store name of "companies" ', () => {
        // Arrange

        // Act

        // Assert
        expect(service['storeName']).toEqual('companies');
    });
});
