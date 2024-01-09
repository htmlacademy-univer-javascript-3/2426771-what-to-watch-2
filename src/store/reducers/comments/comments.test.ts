import { LoadingStatus } from '../../../types/loading/loading';
import { commentsLoaded, commentsReducer, commentsRequestFailed, commentsRequested } from './comments';

describe('commentsSlice Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      comments: [],
      loadingStatus: LoadingStatus.Unknown
    };

    const result = commentsReducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      comments: [],
      loadingStatus: LoadingStatus.Unknown
    };

    const result = commentsReducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set loadingStatus equals Loading with "commentsRequested" action', () => {
    const initialState = {
      comments: [],
      loadingStatus: LoadingStatus.Unknown
    };
    const expectedState = {
      comments: [],
      loadingStatus: LoadingStatus.Loading
    };

    const result = commentsReducer(initialState, commentsRequested);

    expect(result).toEqual(expectedState);
  });

  it('should set loadingStatus equals Failed with "commentsRequestFailed" action', () => {
    const initialState = {
      comments: [],
      loadingStatus: LoadingStatus.Unknown
    };
    const expectedState = {
      comments: [],
      loadingStatus: LoadingStatus.Failed
    };

    const result = commentsReducer(initialState, commentsRequestFailed);

    expect(result).toEqual(expectedState);
  });

  it('should set comments and loadingStatus equals Loaded with "commentsLoaded" action', () => {
    const initialState = {
      comments: [],
      loadingStatus: LoadingStatus.Unknown
    };

    const comments = [
      {
        id: '1',
        date: '2024-01-08T21:02:07.879Z',
        user: 'username',
        comment: 'string',
        rating: 5
      }, {
        id: '2',
        date: '2024-02-07T21:02:07.879Z',
        user: 'username 2',
        comment: 'string 2',
        rating: 7
      }
    ];

    const expectedState = {
      comments: comments,
      loadingStatus: LoadingStatus.Loaded
    };

    const result = commentsReducer(initialState, commentsLoaded(comments));

    expect(result).toEqual(expectedState);
  });

});
