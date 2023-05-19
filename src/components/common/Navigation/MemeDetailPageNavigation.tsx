import { BackButton } from "./BackButton";
import { Navigation } from "./Navigation";
import { SideBar } from "./SideBar";

/**
 * @desc
 * 추후 ExplorePageNavigation 으로 합쳐질 수 있음
 * 현재 디자인 작업 중인 것 같아서 따로 분리 함
 *
 */
export const MemeDetailPageNavigation = () => {
  return (
    <Navigation>
      <Navigation.Left>
        <BackButton />
      </Navigation.Left>
      <Navigation.Right>
        <SideBar />
      </Navigation.Right>
    </Navigation>
  );
};