export interface GetMyAccountResponse {
  id: number;
  email: string;
  name: string;
  createdDate: string;
  modifiedDate: string | null;
  imageUrl: string;
  shareCount: number;
  saveCount: number;
  collectionId: number;
  shareCollectionId: number;
}
