/**
 * NOTE
 * 임시: 밈을 포함하는 콜렉션 정보 API Response type
 * 백엔드에 밈별 콜렉션 정보 API 인터페이스 요청하기
 */
export type GetCollectionCheckResponse = {
  isAdded: boolean;
  collectionId: number | null;
};
