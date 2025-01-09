import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss',
})
export class DynamicFormComponent {
  @Input() jsonData = {};
  keyObject: any = {};
  objectKeys = Object.keys;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['jsonData'].currentValue) {
      this.keyObject = {};
      this.traverse(this.jsonData);
    }
  }

  public traverse(jsonObject: any) {
    if (jsonObject instanceof Array === false) {
      for (let key in jsonObject) {
        if (jsonObject.hasOwnProperty(key)) {
          if (typeof jsonObject[key] === 'object' && jsonObject[key] !== null) {
            if (jsonObject[key] instanceof Array) {
              if (typeof jsonObject[key][0] === 'object') {
                const list = [];
                for (let key1 in jsonObject[key]) {
                  list.push(Object.values(jsonObject[key][key1])[0]);
                }
                this.keyObject[key] = {
                  selectedValue: list[0],
                  valueList: list,
                };
              } else {
                this.keyObject[key] = {
                  selectedValue: jsonObject[key][0],
                  valueList: jsonObject[key],
                };
              }
            } else {
              this.keyObject[key] = '';
            }
            this.traverse(jsonObject[key]);
          } else {
            this.keyObject[key] = jsonObject[key];
          }
        }
      }
    }
  }

  public submit() {
    console.log(this.keyObject);
  }

  public isSelect(val: any) {
    return val.valueList instanceof Array;
  }
}
