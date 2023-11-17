import {FC} from 'react';
import { useVideoPreview } from '../../hooks/use-video-preview';
import c from './video-preview.module.css';

interface Props {
  className?: string;
  isActive: boolean;
  previewImage: string;
  videoLink: string;
  alt: string;
  videoTimeout: number;
}

const VideoPreview: FC<Props> = ({isActive, className, previewImage, videoLink, alt, videoTimeout}) => {
  const isPreviewPlays = useVideoPreview(isActive, videoTimeout);

  return (
    <div className={className}>
      {isPreviewPlays
        ? <div className={c.videoContainer}><video className={c.video} muted autoPlay src={videoLink}/></div>
        : <img src={previewImage} alt={alt} />}
    </div>
  );
};

export {
  VideoPreview
};
