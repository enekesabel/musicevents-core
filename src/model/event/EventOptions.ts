export type EventOptions = {
  id: string;
} & Partial<{
  artistId: string;
  datetime: string;
  url: string;
  description: string;
  favourite: boolean;
  locationName: string;
  city: string;
}>;
