import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.css";

export default function YouTubeCustomControls({ videoId = "dQw4w9WgXcQ" }) {
  const playerRef = useRef(null);
  const [player, setPlayer] = useState(null);
  const [playing, setPlaying] = useState(true);
  const [mute, setMute] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    window.onYouTubeIframeAPIReady = () => {
      const ytPlayer = new window.YT.Player("yt-player", {
        height: "480",
        width: "640",
        videoId: videoId,
        playerVars: {
          controls: 0,
          autoplay: 1,
          mute: 1,
        },
        events: {
          onReady: (event) => {
            setPlayer(event.target);
            setDuration(event.target.getDuration());
          },
        },
      });
    };
  }, []);

  function get_time(time) {
    const minutes = Math.floor(time) / 60;
    const seconds = (minutes - Math.floor(minutes)) * 60;

    return (
      String(Math.floor(minutes)).padStart(2, "0") +
      ":" +
      String(Math.floor(seconds)).padStart(2, "0")
    );
  }

  useEffect(() => {
    if (playing) player?.playVideo();
    else player?.pauseVideo();
    if (mute) player?.mute();
    else player?.unMute();
  }, [playing, mute]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (player) {
        setCurrentTime(player.getCurrentTime());
        setDuration(player.getDuration());
      }
    }, 50);

    return () => clearInterval(interval);
  }, [player]);

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    player.seekTo(time);
  };

  return (
    <div className="video-container">
      <div id="yt-player" ref={playerRef}></div>
      <img
        src={`https://img.youtube.com/vi/${videoId}/sddefault.jpg`}
        className="image-cover"
        alt="cover"
      />
      <div className="overlay"></div>
      <div className="controls">
        <FontAwesomeIcon
          icon={playing ? "caret-right" : "pause"}
          onClick={() => setPlaying((p) => !p)}
          className="play"
        />
        <FontAwesomeIcon
          icon={mute ? "volume-mute" : "volume-high"}
          className="play"
          onClick={() => setMute((m) => !m)}
        />
        <input
          type="range"
          min={0}
          max={duration}
          step={1}
          value={currentTime}
          onChange={handleSeek}
          style={{ width: "100%" }}
        />
        <span className="time-display">{get_time(currentTime)}</span>
        <span className="sep">/</span>
        <span className="time-display">{get_time(duration)}</span>
      </div>
    </div>
  );
}
