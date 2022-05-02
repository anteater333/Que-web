import { QueResourceAPI } from "../interfaces";
import mockVideoCardData from "../../../potato/mockData/VideoCardData";

let lastIndex = 0;

const getTestVideoCardData = async (per: number, page: number) => {
  let start = 0;
  if (page == 0) {
    lastIndex = 0;
  } else {
    start = lastIndex;
  }
  lastIndex += per;
  return mockVideoCardData.slice(start, lastIndex);
};

const TestApiClient = {
  getVideoDownloadURL: async (storageURL: string) => {
    return "https://firebasestorage.googleapis.com/v0/b/que-backend-dev.appspot.com/o/testvideo.mp4?alt=media&token=92554770-0ef5-4e1f-8ee8-21b70f29dc53";
  },
  getImageDownloadURL: async (storageURL: string) => {
    return "https://firebasestorage.googleapis.com/v0/b/que-backend-dev.appspot.com/o/videos%2Fthumbnail%2Fimage%202.png?alt=media&token=eb095c87-0a2c-46e0-a436-dc3fc958e8e3";
  },
  getVideoCardData: getTestVideoCardData,
};

export default TestApiClient;
