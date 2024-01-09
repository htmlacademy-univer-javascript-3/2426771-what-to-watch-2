import React, {useEffect, useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Film } from '../../types/film/index';

interface PlayerProps {
  film: Film;
}

const formatDuration = (timeInSeconds: number): string => {
  const h = Math.floor(timeInSeconds / 3600);
  const m = Math.floor((timeInSeconds % 3600) / 60);
  const s = Math.floor(timeInSeconds % 60);

  const formatTwoDigits = (value: number) => (value < 10 ? `0${value}` : `${value}`);

  if (h > 0) {
    return `-${formatTwoDigits(h)}:${formatTwoDigits(m)}:${formatTwoDigits(s)}`;
  } else {
    return `-${formatTwoDigits(m)}:${formatTwoDigits(s)}`;
  }
};

function PlayerComponent({film: {posterImage, videoLink, name, runTime}}: PlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [lastTime, setLastTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();


  useEffect(() => {
    if (videoRef.current && videoRef.current?.paused !== !isPlaying) {
      setIsPlaying(!isPlaying);
    }
  }, [videoRef.current?.paused]);

  const handlePlayClick = () => {
    if (isPlaying) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleFullscreenClick = () => {
    videoRef.current?.requestFullscreen();
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setLastTime(videoRef.current?.currentTime);
      setProgress((videoRef.current?.currentTime / runTime) * 100);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="player">
      <video
        autoPlay
        ref={videoRef}
        src={videoLink}
        className="player__video"
        poster={posterImage}
        onTimeUpdate={handleTimeUpdate}
      >
        <source src={videoLink} type="video/mp4"/>
      </video>

      <button type="button" className="player__exit" onClick={handleGoBack}>Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={progress} max="100"></progress>
            <div className="player__toggler" style={{left: `${progress}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{formatDuration(runTime - lastTime)}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={handlePlayClick}>
            {
              !isPlaying ? (
                <>
                  <svg viewBox={`0 0 ${19} ${19}`} width={19} height={19}>
                    <use xlinkHref={'#play-s'}></use>
                  </svg>
                  <span>Play</span>
                </>
              )
                : (
                  <>
                    <svg viewBox={`0 0 ${14} ${21}`} width={14} height={21}>
                      <use xlinkHref={'#pause'}></use>
                    </svg>
                    <span>Pause</span>
                  </>
                )
            }
          </button>
          <div className="player__name">{name}</div>
          <button type="button" className="player__full-screen" onClick={handleFullscreenClick}>
            <svg viewBox={`0 0 ${27} ${27}`} width={27} height={27}>
              <use xlinkHref={'#full-screen'}></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export const Player = React.memo(PlayerComponent);
