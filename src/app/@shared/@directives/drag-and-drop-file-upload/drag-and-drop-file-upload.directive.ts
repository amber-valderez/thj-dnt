import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appFileDrop]',
  standalone: true
})
export class FileDropDirective {
  @Output() filesDropped = new EventEmitter<FileList>();
  @Output() dragging = new EventEmitter<boolean>();

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent): void {
    event.preventDefault();  // Prevent default behavior
    console.log('Drag over');
    this.dragging.emit(true);
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent): void {
    event.preventDefault();  // Prevent default behavior
    console.log('Drag leave');
    this.dragging.emit(false);
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent): void {
    event.preventDefault();  // Prevent default behavior
    this.dragging.emit(false);
    
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      console.log('Files dropped');
      this.filesDropped.emit(files);
    }
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event: MouseEvent): void {
    console.log('Mouse leave');
    this.dragging.emit(false);
  }
}
