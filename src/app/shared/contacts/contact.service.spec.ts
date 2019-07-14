import { TestBed } from '@angular/core/testing';

import { ContactService } from './contact.service';

describe('ContactService', () => {
    let service: ContactService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.get(ContactService);
    });

    it('ConS001 - should be created', () => {
        // Arrange
        // Act
        // Assert
        expect(service).toBeTruthy();
    });

    it('ConS002 - should have a store name of "contacts" ', () => {
        // Arrange

        // Act

        // Assert
        expect(service['storeName']).toEqual('contacts');
    });
});
