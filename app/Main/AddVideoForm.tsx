import React, { useEffect, useState } from "react";
import { Form } from "react-router";
import "../../CSS/AddVideoForm.css";
import thumbnail from "../../public/thumbnail.png";
import type { TVideo } from "~/Types/Video";

const AddVideoForm: React.FunctionComponent = () => {
  const [url, setUrl] = useState<string>("");
  const [caption, setCaption] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showCaption, setShowCaption] = useState(false);
  const [videoList, setVideoList] = useState<TVideo[]>([]);
  const [startVideo, setStartVideo] = useState<Boolean>(false);

  let interval: NodeJS.Timeout | null = null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (startTime > endTime) {
      alert("Time is wrong");
      setShowCaption(false);
      setStartTime(0);
      setEndTime(0);
    } else {
      setStartVideo(true);
      setShowCaption(true);
      setVideoList((prev) => [
        ...prev,
        {
          url,
          caption,
          startTime,
          endTime,
        },
      ]);
    }
  };

  const handleCaptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCaption(e.target.value);
  };

  const handleVideoUrl = () => {
    if (!url) return;

    const videoIdMatch = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|.*embed\/))([\w-]{11})/
    );
    if (videoIdMatch && videoIdMatch[1]) {
      setVideoUrl(`https://www.youtube.com/embed/${videoIdMatch[1]}`);
    } else {
      alert("Invalid YouTube URL!");
    }
  };

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartTime(Number(e.target.value));
  };

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndTime(Number(e.target.value));
  };

  useEffect(() => {
    if (videoUrl && startVideo) {
      interval = setInterval(() => {
        setCurrentTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [startVideo]);

  // useEffect(() => {
  //   if (startTime > endTime && startVideo) {
  //     alert("Time is wrong");
  //     setShowCaption(false);
  //     setStartTime(0);
  //     setEndTime(0);
  //   }
  // }, [startTime, endTime]);

  useEffect(() => {
    setShowCaption(currentTime >= startTime && currentTime <= endTime);
  }, [currentTime, startTime, endTime, startVideo]);

  const handleReset = () => {
    setUrl("");
    setVideoUrl("");
    setCaption("");
    setStartTime(0);
    setEndTime(0);
    setCurrentTime(0);
    setShowCaption(false);
  };

  return (
    <>
      <div className="form_video_wrapper">
        <Form onSubmit={handleSubmit} className="add_video_form">
          <div className="inputs">
            <span>Video URL: </span>
            <input
              type="url"
              name="video_url"
              placeholder="Paste Video URL"
              required
              value={url}
              onChange={handleChange}
            />
          </div>
          <button type="button" onClick={handleVideoUrl}>
            Show Video Preview
          </button>
          <div className="inputs">
            <span>Caption: </span>
            <textarea
              name="caption"
              placeholder="Write Caption"
              required
              value={caption}
              onChange={handleCaptionChange}
            />
          </div>
          <div className="inputs_time_wrapper">
            <div className="inputs">
              <span>Start Time: </span>
              <input
                type="text"
                name="start_time"
                placeholder="Enter time in Seconds"
                required
                value={startTime}
                onChange={handleStartTimeChange}
              />
            </div>
            <div className="inputs">
              <span>End Time: </span>
              <input
                type="text"
                name="end_time"
                placeholder="Enter time in Seconds"
                required
                value={endTime}
                onChange={handleEndTimeChange}
              />
            </div>
          </div>
          <button type="submit">Add Caption</button>
          <button type="reset" onClick={handleReset}>
            Reset
          </button>
        </Form>

        <div
          style={{
            position: "relative",
            width: "50%",
          }}
        >
          {videoUrl === "" ? (
            <img
              src={`${thumbnail}`}
              style={{
                width: "100%",
              }}
            />
          ) : (
            <iframe
              src={`${videoUrl}`}
              referrerPolicy="strict-origin-when-cross-origin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          )}

          <div
            className="video_caption"
            style={{
              position: "absolute",
              bottom: "30%",
              left: "50%",
              padding: "5px 10px",
              // visibility: `${showCaption ? "visible" : "hidden"}`,
              color: "#fff",
              borderRadius: "4px",
            }}
          >
            {showCaption && caption}
          </div>
        </div>
      </div>
      <div className="list_name">
        <h3>Caption List</h3>
        <ul>
          {videoList.map((item) => {
            return (
              <li>
                <h5>Caption: </h5> <p>{item.caption}</p>
                <h5>Start Time: </h5> <p>{item.startTime}</p>
                <h5>End Time: </h5>
                <p>{item.endTime}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default AddVideoForm;
