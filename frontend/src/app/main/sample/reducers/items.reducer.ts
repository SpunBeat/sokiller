import { createFeatureSelector } from '@ngrx/store';
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { ItemTypes, ItemActions } from '../actions/items.actions';

export interface Item { id: string; name: string; }

// State
export interface ItemState extends EntityState<Item> { }

// Adapter
const adapter: EntityAdapter<Item> = createEntityAdapter<Item>();

// Initial State
const defaultItem: ItemState = { ids: [], entities: {} };
const initialState: ItemState = adapter.getInitialState(defaultItem);

export function itemsReducer(
  state: ItemState = initialState,
  action: ItemActions
): ItemState {
  switch (action.type) {
    case ItemTypes.LoadSuccess:
      return adapter.addAll(action.payload, state);
    default:
      return state;
  }
}

const getItemState = createFeatureSelector<ItemState>('items');
export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors(getItemState);
