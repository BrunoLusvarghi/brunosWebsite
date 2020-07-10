import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  backgroundColor: string = "";
  backgroundColorChange: Subject<string> = new Subject<string>();
  setBackgroundColor(color: string) {
    this.backgroundColor = color;

  }
  getBackgroundColor() { return this.backgroundColor; }


  pageIndex: Number;
  pageIndexChange: Subject<Number> = new Subject<Number>();
  setPageIndex(pageIdx: Number) {
    this.pageIndex = pageIdx;
    switch (pageIdx) {
      case 0:

        // this.setBackgroundColor('rgb(200,250,200)');
        this.setBackgroundColor('#F3D250');
        break;
      case 1:
        this.setBackgroundColor('#F78888');
        // this.setBackgroundColor('#fac8c8');
        break;
      case 2:
        // this.setBackgroundColor('rgb(200,200,250)');
        this.setBackgroundColor('#90CCF4');
        break;

    }

  }
  getPageIndex() { return this.pageIndex; }

  constructor() {

    this.backgroundColorChange.subscribe((value) => {
      this.backgroundColor = value;
    });

    this.pageIndexChange.subscribe((value) => {
      this.pageIndex = value;
    });

  }
}
