import type { FC, SVGProps } from "react";
import { css, theme } from "twin.macro";

import * as Icons from "./assets";

const colors = {
  black: "black",
  white: "white",
  default: "",
  gray: `${theme`colors.gray.600`}`,
  primary: `${theme`colors.primary.500`}`,
};

export type IconName = keyof typeof Icons;

interface Props extends SVGProps<SVGSVGElement> {
  name: IconName;
  color?: keyof typeof colors;
  isStroke?: boolean;
}
export const Icon = ({ name, color = "default", isStroke = false, ...rest }: Props) => {
  const Svg = Icons[name] as FC<SVGProps<SVGSVGElement>>;

  return (
    <Svg
      css={css`
        & * {
          stroke: ${colors[color]};
          ${!isStroke && `fill : ${colors[color]};`}
        }
      `}
      {...rest}
    />
  );
};
