import { FilmCard } from '../../../types/film';
import { LoadingStatus } from '../../../types/loading/loading';
import { filmsLoaded, filmsReducer, filmsRequestFailed, filmsRequested } from './films';

describe('filmsSlice Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      films: [],
      loadingStatus: LoadingStatus.Unknown
    };

    const result = filmsReducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      films: [],
      loadingStatus: LoadingStatus.Unknown
    };

    const result = filmsReducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set loadingStatus equals Loading with "filmsRequested" action', () => {
    const initialState = {
      films: [],
      loadingStatus: LoadingStatus.Unknown
    };
    const expectedState = {
      films: [],
      loadingStatus: LoadingStatus.Loading
    };

    const result = filmsReducer(initialState, filmsRequested);

    expect(result).toEqual(expectedState);
  });

  it('should set loadingStatus equals Failed with "filmsRequestFailed" action', () => {
    const initialState = {
      films: [],
      loadingStatus: LoadingStatus.Unknown
    };
    const expectedState = {
      films: [],
      loadingStatus: LoadingStatus.Failed
    };

    const result = filmsReducer(initialState, filmsRequestFailed);

    expect(result).toEqual(expectedState);
  });

  it('should set films and loadingStatus equals Loaded with "filmsLoaded" action', () => {
    const initialState = {
      films: [],
      loadingStatus: LoadingStatus.Unknown
    };

    const films: FilmCard[] = [
      {
        'id': 'be3bbee5-fb5c-4800-984c-aa388faf8370',
        'name': 'Bohemian Rhapsody',
        'previewImage': 'https://13.design.htmlacademy.pro/static/film/preview/bohemian_rhapsody.jpg',
        'previewVideoLink': 'https://13.design.htmlacademy.pro/static//film/video/traffic.mp4',
        'genre': 'Drama'
      },
      {
        'id': '47094b8a-b5c8-4914-a8b4-d9cbc2f8afa2',
        'name': 'Macbeth',
        'previewImage': 'https://13.design.htmlacademy.pro/static/film/preview/macbeth.jpg',
        'previewVideoLink': 'https://13.design.htmlacademy.pro/static//film/video/traffic.mp4',
        'genre': 'Drama'
      },
      {
        'id': '992203ef-3327-4cea-9a12-03315ce851cd',
        'name': 'We need to talk about Kevin',
        'previewImage': 'https://13.design.htmlacademy.pro/static/film/preview/we-need-to-talk-about-kevin.jpg',
        'previewVideoLink': 'https://13.design.htmlacademy.pro/static//film/video/dog.mp4',
        'genre': 'Drama'
      },
      {
        'id': 'ae8f3f00-f982-48ec-b6c5-cf1577886fe9',
        'name': 'Orlando',
        'previewImage': 'https://13.design.htmlacademy.pro/static/film/preview/orlando.jpg',
        'previewVideoLink': 'https://13.design.htmlacademy.pro/static//film/video/dog.mp4',
        'genre': 'Drama'
      },
      {
        'id': 'de99bcad-4ef9-40e3-aa08-803b8af4338e',
        'name': 'A Star Is Born',
        'previewImage': 'https://13.design.htmlacademy.pro/static/film/preview/A_Star_Is_Born.jpg',
        'previewVideoLink': 'https://13.design.htmlacademy.pro/static//film/video/dog.mp4',
        'genre': 'Drama'
      }
    ];

    const expectedState = {
      films: films,
      loadingStatus: LoadingStatus.Loaded
    };

    const result = filmsReducer(initialState, filmsLoaded(films));

    expect(result).toEqual(expectedState);
  });

});
