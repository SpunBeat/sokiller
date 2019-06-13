import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { Load, SubmitItem, CallItem } from './actions/items.actions';
import * as fromItems from './reducers/items.reducer';

@Component({
  selector: 'sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss']
})
export class SampleComponent implements OnInit, OnDestroy {
  public itemForm: FormGroup;
  public items$: Observable<any>;
  private _unsubscribeAll: Subject<any>;

  constructor(
    private readonly afs: AngularFirestore,
    private fb: FormBuilder,
    private store: Store<any>
  ) {
    this.store.dispatch(new Load());
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.items$ = this.store.pipe(select(fromItems.selectAll));
    this.items$.pipe(takeUntil(this._unsubscribeAll)).subscribe(() => this.initForms());
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  initForms(): void {
    this.itemForm = this.fb.group({
      id: [this.afs.createId()],
      name: ['', Validators.required]
    });
  }

  submitForm(): void {
    const id = this.itemForm.get('id').value;
    const item: fromItems.Item = this.itemForm.value;
    this.store.dispatch(new SubmitItem(id, item));
  }

  call(): void {
    this.store.dispatch(new CallItem('Dios incomparable'));
  }
}
