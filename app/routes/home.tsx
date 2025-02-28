import { useState } from "react";
import AddVideoForm from "~/Main/AddVideoForm";
import type { TVideo } from "~/Types/Video";

export default function Home() {
  const [videoList, setVideoList] = useState<TVideo[]>([]);

  return <AddVideoForm list={videoList}/>;
}
