import type { FC, SVGProps } from "react";
import { css, theme } from "twin.macro";

import * as Icons from "./assets";

type PrefixColor = "gray" | "primary" | "secondary";
type Variation = "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | "1000";
type Colors = `${PrefixColor}-${Variation}` | "black" | "white" | "";

const colors: { [K in Colors]?: string } = {
  black: "black",
  white: "white",
  "": "",
  "gray-600": theme`colors.gray.600`,
  "primary-500": theme`colors.primary.500`,
};

export type IconName = keyof typeof Icons;

interface Props extends SVGProps<SVGSVGElement> {
  name: IconName;
  color?: Colors;
  stroke?: Colors;
  fill?: Colors;
}
export const Icon = ({ name, color = "", stroke = "", fill = "", ...rest }: Props) => {
  const Svg = Icons[name] as FC<SVGProps<SVGSVGElement>>;

  return (
    <Svg
      css={css`
        & * {
          stroke: ${colors[stroke || color]};
          fill: ${colors[fill || color]};
        }
      `}
      {...rest}
    />
  );
};
