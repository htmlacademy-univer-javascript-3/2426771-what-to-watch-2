import { Film } from '../../../types/film';
import { LoadingStatus } from '../../../types/loading/loading';
import { filmLoaded, filmReducer, filmRequestFailed, filmRequested } from './film';

describe('filmSlice Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      film: null,
      loadingStatus: LoadingStatus.Unknown
    };

    const result = filmReducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      film: null,
      loadingStatus: LoadingStatus.Unknown
    };

    const result = filmReducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set loadingStatus equals Loading with "filmRequested" action', () => {
    const initialState = {
      film: null,
      loadingStatus: LoadingStatus.Unknown
    };
    const expectedState = {
      film: null,
      loadingStatus: LoadingStatus.Loading
    };

    const result = filmReducer(initialState, filmRequested);

    expect(result).toEqual(expectedState);
  });

  it('should set loadingStatus equals Failed with "filmRequestFailed" action', () => {
    const initialState = {
      film: null,
      loadingStatus: LoadingStatus.Unknown
    };
    const expectedState = {
      film: null,
      loadingStatus: LoadingStatus.Failed
    };

    const result = filmReducer(initialState, filmRequestFailed);

    expect(result).toEqual(expectedState);
  });

  it('should set film and loadingStatus equals Loaded with "filmLoaded" action', () => {
    const initialState = {
      film: null,
      loadingStatus: LoadingStatus.Unknown
    };

    const film: Film = {
      'id': 'c8682b0c-a8dd-4f2d-befd-36d59e4fcf7c',
      'name': 'Aviator',
      'posterImage': 'https://13.design.htmlacademy.pro/static/film/poster/Aviator.jpg',
      'backgroundImage': 'https://13.design.htmlacademy.pro/static/film/background/Aviator.jpg',
      'backgroundColor': '#D6CDAF',
      'videoLink': 'https://13.design.htmlacademy.pro/static/film/video/bubbles.mp4',
      'description': 'A biopic depicting the early years of legendary Director and aviator Howard Hughes\' career from the late 1920s to the mid 1940s.',
      'rating': 9.8,
      'scoresCount': 307174,
      'director': 'Martin Scorsese',
      'starring': [
        'Leonardo DiCaprio',
        'Cate Blanchett',
        'Kate Beckinsale'
      ],
      'runTime': 170,
      'genre': 'Drama',
      'released': 2014,
      'isFavorite': true
    };

    const expectedState = {
      film: film,
      loadingStatus: LoadingStatus.Loaded
    };

    const result = filmReducer(initialState, filmLoaded(film));

    expect(result).toEqual(expectedState);
  });

});
