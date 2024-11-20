import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-error-dialog',
  templateUrl: './error-dialog.component.html',
  styles: `
  .modal {
  display: flex;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5); /* Black background with opacity */
}

.modal-content {
  background-color: #fff;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 300px;
  position: relative;
}

.close {
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 20px;
  cursor: pointer;
}

  `
})
export class ErrorDialogComponent {
    @Input() message: string | null = null;
    @Input() isVisible: boolean = false;
    @Input() error?: Error;

    close() {
      this.isVisible = false;
    }
}
