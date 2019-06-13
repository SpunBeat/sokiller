import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { Item } from './reducers/items.reducer';
import { AngularFireFunctions } from '@angular/fire/functions';

@Injectable({
  providedIn: 'root'
})
export class SampleService {
  itemsCollection: AngularFirestoreCollection<Item>;

  constructor(
    private readonly afs: AngularFirestore,
    private fns: AngularFireFunctions
  ) {
    this.itemsCollection = this.afs.collection<Item>('persons');
  }

  getAll(): Observable<Item[]> {
    return this.itemsCollection.valueChanges();
  }

  submit(id: string, item: Item): Observable<Promise<any>> {
    return of(this.itemsCollection.doc(id).set(item));
  }

  callable(name: string): Observable<any> {
    return this.fns
      .httpsCallable('addPerson')({ name });
  }
}
