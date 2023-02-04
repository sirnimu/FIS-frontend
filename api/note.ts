import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Note = {
  id: number;
  user: string;
  fishingDate: string;
  startTime: string;
  endTime: string;
  coordinates: any;
  waterBody: string;
  fishingMethod: any;
  fishCount: string;
  bait: string;
  note: string;
  temp: string;
  windKph: string;
  windDir: string;
  cloudPct: string;
  conditionText: string;
};

export const getNotes = () => {
  return useQuery(["notes"], async (): Promise<Note[]> => {
    return axios
      .get("http://sheikasop-001-site1.atempurl.com/api/note")
      .then((res) => res.data);
  });
};
