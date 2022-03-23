import { VideoCardProps } from "../../app/components/cards/VideoCard";

const mockVideoCardData: VideoCardProps[] = [
  {
    videoInfo: {
      videoId: "1",
      title: "test1",
      uploader: { nickname: "nobody" },
    },
  },
  { videoInfo: { videoId: "2", title: "test2" } },
  { videoInfo: { videoId: "3", title: "test3" } },
  { videoInfo: { videoId: "4", title: "test4" } },
  { videoInfo: { videoId: "5", title: "test5" } },
  { videoInfo: { videoId: "6", title: "test6" } },
  { videoInfo: { videoId: "7", title: "test7" } },
  { videoInfo: { videoId: "8", title: "test8" } },
  { videoInfo: { videoId: "9", title: "test9" } },
  { videoInfo: { videoId: "10", title: "test10" } },
];

export default mockVideoCardData;
