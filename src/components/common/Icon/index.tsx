import type { FC, SVGProps } from "react";
import { css, theme } from "twin.macro";

import * as Icons from "./assets";

const colors = {
  black: "black",
  white: "white",
  "stroke-white": "white",
  default: "",
  gray: `${theme`colors.gray.600`}`,
  primary: `${theme`colors.primary.500`}`,
};

export type IconName = keyof typeof Icons;

interface Props extends SVGProps<SVGSVGElement> {
  name: IconName;
  color?: keyof typeof colors;
}
export const Icon = ({ name, color = "default", ...rest }: Props) => {
  const Svg = Icons[name] as FC<SVGProps<SVGSVGElement>>;

  return (
    <Svg
      css={css`
        & * {
          stroke: ${colors[color]};
          ${color.search("stroke") && `fill : ${colors[color]};`}
        }
      `}
      {...rest}
    />
  );
};
