import axios from "./axios";

export type Note = {
  id: number;
  user: string;
  startTime: string;
  endTime: string;
  coordinates: Coordinates;
  waterBody: string;
  fishingMethod: FishingMethod;
  fishCount: number;
  bait: string;
  description: string;
  temp: string;
  windKph: string;
  windDir: string;
  cloudPct: string;
  conditionText: string;
};

export type Coordinates = { latitude: number; longitude: number };

export enum FishingMethod {
  Spinning = 1,
  Float,
  Bottom,
  IceFishing,
  Other,
}

export const getNote = async (id: Note["id"]): Promise<Note> => {
  return axios.get("/note", { params: { id } }).then((res) => res.data);
};

export const getNotes = async (): Promise<Note[]> => {
  return axios.get("/note").then((res) => res.data);
};

export const createNote = async (newNote: Partial<Note>): Promise<Note[]> => {
  return axios.post("/note", newNote);
};

export const editNote = async (updatedNote: Partial<Note>) => {
  return axios.put("/note", updatedNote);
};

export const deleteNote = async (id: Note["id"]): Promise<Note[]> => {
  return axios.delete("/note", { params: { id } });
};
