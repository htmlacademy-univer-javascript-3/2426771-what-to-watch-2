import { LoadingStatus } from '../types/loading/loading';

export const getIsLoadingComplete = (loadingStatus: LoadingStatus) =>
  loadingStatus === LoadingStatus.Loaded ||
  loadingStatus === LoadingStatus.Failed;
