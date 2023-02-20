export type GetMyAccountResponse = {
  createdDate: string;
  email: string;
  modifiedDate: string | null;
  name: string;
  imageUrl?: string;
  shareCount: number;
  saveCount: number;
  collectionId: number;
  sharedCollectionId: number;
  id: number;
};
