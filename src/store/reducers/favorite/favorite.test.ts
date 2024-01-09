import { LoadingStatus } from '../../../types/loading/loading';
import { favoriteLoaded, favoriteReducer, favoriteRequestFailed, favoriteRequested } from './favorite';

describe('favoriteSlice Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      favorite: [],
      loadingStatus: LoadingStatus.Unknown
    };

    const result = favoriteReducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      favorite: [],
      loadingStatus: LoadingStatus.Unknown
    };

    const result = favoriteReducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set loadingStatus equals Loading with "favoriteRequested" action', () => {
    const initialState = {
      favorite: [],
      loadingStatus: LoadingStatus.Unknown
    };
    const expectedState = {
      favorite: [],
      loadingStatus: LoadingStatus.Loading
    };

    const result = favoriteReducer(initialState, favoriteRequested);

    expect(result).toEqual(expectedState);
  });

  it('should set loadingStatus equals Failed with "favoriteRequestFailed" action', () => {
    const initialState = {
      favorite: [],
      loadingStatus: LoadingStatus.Unknown
    };
    const expectedState = {
      favorite: [],
      loadingStatus: LoadingStatus.Failed
    };

    const result = favoriteReducer(initialState, favoriteRequestFailed);

    expect(result).toEqual(expectedState);
  });

  it('should set favorite and loadingStatus equals Loaded with "favoriteLoaded" action', () => {
    const initialState = {
      favorite: [],
      loadingStatus: LoadingStatus.Unknown
    };

    const favorite = [
      {
        genre: 'Drama',
        id: '1',
        name: 'Aviator',
        previewImage: 'https://13.design.htmlacademy.pro/static/film/preview/aviator.jpg',
        previewVideoLink: 'https://13.design.htmlacademy.pro/static//film/video/traffic.mp4'
      }, {
        genre: 'Drama 2',
        id: '2',
        name: 'Aviator 2',
        previewImage: 'https://13.design.htmlacademy.pro/static/film/preview/aviator.jpg',
        previewVideoLink: 'https://13.design.htmlacademy.pro/static//film/video/traffic.mp4'
      }
    ];

    const expectedState = {
      favorite: favorite,
      loadingStatus: LoadingStatus.Loaded
    };

    const result = favoriteReducer(initialState, favoriteLoaded(favorite));

    expect(result).toEqual(expectedState);
  });

});
