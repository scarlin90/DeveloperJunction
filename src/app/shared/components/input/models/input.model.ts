import { FormGroup } from '@angular/forms';

export class InputModel {
    label: string;
    form: FormGroup;
    inputKey: string;
    validationErrors: Map<string, string>;
    currentError: string;

    constructor(inputModel?: Partial<InputModel>) {
        if (!!inputModel) {
            Object.assign(this, inputModel);
        }
    }
}
