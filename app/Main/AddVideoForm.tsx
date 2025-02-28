import React, { useState } from "react";
import { Form } from "react-router";
import "../../CSS/AddVideoForm.css";
import type { VideoProps } from "~/Types/Video";

const AddVideoForm: React.FunctionComponent<VideoProps> = (list) => {
  const [url, setUrl] = useState<string>("");
  const [caption, setCaption] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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

  return (
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
              type="time"
              name="start_time"
              placeholder="In Seconds"
              required
            />
          </div>
          <div className="inputs">
            <span>End Time: </span>
            <input
              type="time"
              name="end_time"
              placeholder="In Seconds"
              required
            />
          </div>
        </div>
        <button type="submit">Add</button>
      </Form>
      {videoUrl === "" ? (
        <></>
      ) : (
        <div style={{
            position: "relative"
        }}>
          <iframe
            width="420"
            height="315"
            src={`${videoUrl}`}
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
          {caption && (
            <div
              className="video_caption"
              style={{
                position: "absolute",
                bottom: "30%",
                left: "50%",
                padding: "5px 10px",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                color: "#fff",
                borderRadius: "4px",
              }}
            >
              {caption}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AddVideoForm;
