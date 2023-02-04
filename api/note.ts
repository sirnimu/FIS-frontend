import axios from "./axios";

export type Note = {
  id: number;
  user: string;
  fishingDate: string;
  startTime: string;
  endTime: string;
  coordinates: Coordinates;
  waterBody: string;
  fishingMethod: FishingMethod;
  fishCount: number;
  bait: string;
  note: string;
  temp: string;
  windKph: string;
  windDir: string;
  cloudPct: string;
  conditionText: string;
};

export type Coordinates = { latitude: number; longitude: number };

export enum FishingMethod {
  None = "",
  Spinning = 1,
  Float,
  Bottom,
}

export const getNotes = async (): Promise<Note[]> => {
  return axios.get("/note").then((res) => res.data);
};

export const createNote = async (newNote: Partial<Note>): Promise<Note[]> => {
  return axios.post("/note", newNote);
};
