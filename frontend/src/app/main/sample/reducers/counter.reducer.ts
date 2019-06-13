import { createFeatureSelector } from '@ngrx/store';
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { CounterTypes, CategoryActions } from '../actions/counter.actions';

// Interface
export interface Category {
  id: string;
  size: number;
}

// State
export interface CategoryState extends EntityState<Category> {}

// Adapter
export const adapter: EntityAdapter<Category> = createEntityAdapter<Category>();

const defaultCategory: CategoryState = {
  ids: ['123', '456'],
  entities: {
    '123': {
      id: '123',
      size: 1
    },
    '456': {
      id: '456',
      size: 4
    }
  }
};

// Initial State
export const initialState: CategoryState = adapter.getInitialState(defaultCategory);

export function counterReducer(
  state: CategoryState = initialState,
  action: CategoryActions
): CategoryState {

  switch (action.type) {
    case CounterTypes.Increment:
    case CounterTypes.Decrement:
    case CounterTypes.Reset:
      return adapter.updateOne({
        id: action.id,
        changes: action.changes
      }, state);
    default:
      return state;
  }

}

export const getCategoryState = createFeatureSelector<CategoryState>('count');

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors(getCategoryState);
