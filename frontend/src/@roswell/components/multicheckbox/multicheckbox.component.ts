import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormArray, FormBuilder } from '@angular/forms';
@Component({
  selector: 'rw-multicheckbox',
  templateUrl: './multicheckbox.component.html',
  styleUrls: ['./multicheckbox.component.scss'],
  providers: [{
    provide : NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MulticheckboxComponent),
    multi : true,
  }]
})
export class MulticheckboxComponent implements OnInit, ControlValueAccessor {

  public days: any[];
  public byweekday: FormArray;
  public disabled: boolean;
  private onChange: Function;
  private onTouched: Function;

  constructor(
    private fb: FormBuilder
  ) {
    this.onChange = (_: any) => {};
    this.onTouched = () => {};
    this.disabled = false;
  }

  ngOnInit() { }

  writeValue(obj: any): void {
    this.byweekday = this.fb.array(obj.byweekday);
    const days = obj.days.map(day => {
      day.checked = false;
      for (let i = 0; i < obj.byweekday.length; i++) {
        if (obj.byweekday[i].weekday === day.value) {
          day.checked = true;
          break;
        }
      }
      return {
        ...day
      };
    });
    this.days = days;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  checkboxWeekday(day: { value: number }) {
    const weekday = { weekday: day.value };
    const byweekday = this.byweekday;
    let removed = false;
    byweekday.value.forEach((element: { weekday: number }, i: number) => {
      if (element.weekday === day.value) {
        byweekday.removeAt(i);
        removed = true;
      }
    });
    if (!removed) {
      byweekday.insert(day.value, this.fb.control(weekday));
    }
    this.onChange({
      byweekday: byweekday.value,
      freq: 2,
    });
    this.onTouched();
  }
}
