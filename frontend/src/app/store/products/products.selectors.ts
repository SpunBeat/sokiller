import { adapter } from './products.state';

const { selectAll } = adapter.getSelectors();
export const selectAllProducts = selectAll;
