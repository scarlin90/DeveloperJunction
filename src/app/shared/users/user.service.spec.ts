import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';

describe('UserService', () => {
    let service: UserService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.get(UserService);
    });

    it('US001 - should be created', () => {
        // Arrange
        // Act
        // Assert
        expect(service).toBeTruthy();
    });

    it('US002 - should have a store name of "users" ', () => {
        // Arrange

        // Act

        // Assert
        expect(service['storeName']).toEqual('users');
    });
});
