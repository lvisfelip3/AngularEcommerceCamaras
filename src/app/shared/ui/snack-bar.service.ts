import { inject, Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({ providedIn: "root",})

export class SnackBarService {
    private readonly _snackBar = inject(MatSnackBar);

    showSnackBar(message: string, action = 'OK') {
        this._snackBar.open(message, action, {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
        });
    }
}