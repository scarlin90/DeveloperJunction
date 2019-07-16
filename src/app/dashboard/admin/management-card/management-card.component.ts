import { Component, OnInit } from '@angular/core';
import { ManagementTabState } from '../models/management.tabstate';

@Component({
    selector: 'app-management-card',
    templateUrl: './management-card.component.html',
    styleUrls: ['./management-card.component.scss']
})
export class ManagementCardComponent implements OnInit {
    ManagementTabState = ManagementTabState;

    tabState: ManagementTabState;

    constructor() {}

    ngOnInit() {
        this.tabState = ManagementTabState.List;
    }

    switchTab(tabState: ManagementTabState) {
        this.tabState = tabState;
    }
}
