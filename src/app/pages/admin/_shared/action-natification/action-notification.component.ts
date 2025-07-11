import { Component, Inject, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { timeout, delay } from 'rxjs/operators';
import { of } from 'rxjs';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'm-action-natification',
  templateUrl: './action-notification.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  imports:[CommonModule]
})
export class ActionNotificationComponent implements OnInit {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}

  ngOnInit() {
    if (!this.data.showUndoButton || this.data.undoButtonDuration >= this.data.duration) {
      return;
    }

    this.delayForUndoButton(this.data.undoButtonDuration).subscribe(() => {
      this.data.showUndoButton = false;
    });
  }

  delayForUndoButton(timeToDelay:any) {
    return of('').pipe(delay(timeToDelay));
  }

  public onDismissWithAction() {
    this.data.snackBar.dismiss();
  }

  public onDismiss() {
    this.data.snackBar.dismiss();
  }
}
