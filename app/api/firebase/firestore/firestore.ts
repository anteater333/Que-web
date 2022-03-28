import VideoType from "../../../types/Video";

import {
  query,
  orderBy,
  startAt,
  getDocs,
  getDoc,
  DocumentData,
  CollectionReference,
} from "firebase/firestore";
import { VideoCollection } from "./collections";
import UserType from "../../../types/User";

export async function getVideoCardDataFromFirestore(
  page: number
): Promise<VideoType[]> {
  const querySnapshot = await getDocs(VideoCollection);

  const rtDataset: VideoType[] = [];
  for await (const doc of querySnapshot.docs) {
    const filteredData = { ...doc.data() };
    filteredData.videoId = doc.id;
    if (filteredData.uploader) {
      const uploaderData = await getDoc<UserType>(filteredData.uploader);
      filteredData.uploader = uploaderData.data();
    }
    filteredData.viewed = false;
    filteredData.likedData = [];
    filteredData.starredData = {};
    rtDataset.push(filteredData);
  }

  // console.log(rtDataset[0]);

  return rtDataset;
}
