export interface EventData {
  id: number;
  title: string;
  thumbnail: string;
  tags: string[];
  eventStart: string;
  eventEnd: string;
  address: string;
  description?: string;
  hostId: string;
  saveCount: number;
}
