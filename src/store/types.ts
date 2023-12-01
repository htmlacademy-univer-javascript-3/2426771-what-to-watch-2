import { AxiosInstance } from 'axios';
import { AppDispatch, RootState } from './index';

export type ThunkApiConfig = {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
}
