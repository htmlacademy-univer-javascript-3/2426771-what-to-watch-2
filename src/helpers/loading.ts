import { LoadingStatus } from '../types/loading/loading';

export const isLoadingComplete = (loadingStatus: LoadingStatus) =>
  loadingStatus === LoadingStatus.Loaded ||
  loadingStatus === LoadingStatus.Failed;
