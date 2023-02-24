export type RecentSearchType = "keyword" | "tag";

export interface RecentSearch {
  id: number;
  value: string;
  type: RecentSearchType;
}

export interface RecentSearchWithId extends Omit<RecentSearch, "id"> {
  id?: number;
}
