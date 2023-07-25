export type RecentSearchType = "keyword" | "tag";

export interface RecentSearch {
  id: number;
  value: string;
  type: RecentSearchType;
}
