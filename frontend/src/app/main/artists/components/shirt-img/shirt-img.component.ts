import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-shirt-img',
  templateUrl: './shirt-img.component.html',
  styleUrls: ['./shirt-img.component.scss']
})
export class ShirtImgComponent implements OnInit {

  @Output()
  filechange = new EventEmitter<any>();

  filePristine = true;
  file: any;
  customSrc: any;

  @Input()
  front = {
    file: undefined,
    customSrc: undefined
  };

  @Input()
  back = {
    file: undefined,
    customSrc: undefined
  };

  constructor() { }

  ngOnInit(): void { }

  fileChange(files: File[], obj: any, name: string): void {
    this.filePristine = false;
    obj.file = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      obj.customSrc = reader.result;
      this.filechange.emit({ obj, name });
    };
    reader.readAsDataURL(files[0]);
  }

  removeImage(obj: any) {
    console.log(obj);
    // obj.file = undefined;
    // obj.customSrc = undefined;
   }
}
