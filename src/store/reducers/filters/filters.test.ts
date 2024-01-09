import { filtersReducer, genreChanged } from './filters';

describe('filtersSlice Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      genre: ''
    };

    const result = filtersReducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      genre: ''
    };

    const result = filtersReducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set genre equals payload with "genreChanged" action', () => {
    const initialState = {
      genre: ''
    };
    const expectedState = {
      genre: 'Action'
    };

    const result = filtersReducer(initialState, genreChanged('Action'));

    expect(result).toEqual(expectedState);
  });

});
