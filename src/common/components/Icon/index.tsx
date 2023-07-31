import type { FC, SVGProps } from "react";
import { css, theme } from "twin.macro";

import * as Icons from "./assets";

type PrefixColor = "gray" | "primary" | "secondary";
type Variation = "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | "1000";
type Colors = `${PrefixColor}-${Variation}` | "black" | "white" | "default";

const colors: { [K in Colors]?: string } = {
  black: "black",
  white: "white",
  default: "",
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
export const Icon = ({
  name,
  color = "default",
  stroke = "default",
  fill = "default",
  ...rest
}: Props) => {
  const Svg = Icons[name] as FC<SVGProps<SVGSVGElement>>;

  return (
    <Svg
      css={css`
        & * {
          stroke: ${colors[stroke] || colors[color]};
          fill: ${colors[fill] || colors[color]};
        }
      `}
      {...rest}
    />
  );
};
