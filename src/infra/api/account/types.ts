export type GetMyAccountResponse = {
  createDate: string;
  email: string;
  modifiedDate: string | null;
  name: string;
  imageUrl?: string;
  shareCount: number;
  saveCount: number;
  collectionId: number;
  shareCollectionId: number;
  //user_id 추가 예정
};
