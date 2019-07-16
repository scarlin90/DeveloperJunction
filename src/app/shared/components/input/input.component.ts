import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { InputModel } from './models/input.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit, OnDestroy {
    @Input() inputModel: InputModel;
    private inputSubscription: Subscription;

    constructor() {}

    ngOnInit() {
        if (this.inputModel.form) {
            const input = this.inputModel.form.get(this.inputModel.inputKey);
            this.inputSubscription = input.statusChanges.subscribe(() => {
                if (input.invalid && input.errors) {
                    const validationKey = Object.keys(input.errors)[0];
                    this.inputModel.currentError =
                        this.inputModel.validationErrors.get(validationKey) || 'Something went wrong.';
                } else {
                    this.inputModel.currentError = undefined;
                }
            });
        }
    }

    ngOnDestroy() {
        this.inputSubscription.unsubscribe();
    }
}
