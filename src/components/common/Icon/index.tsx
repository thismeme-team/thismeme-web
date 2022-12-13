import type { FC, SVGProps } from "react";

import * as Icons from "./assets";

// FIXME classname 동적 할당 문제
const colors = {
  black: "[&_*]:fill-black [&_*]:stroke-black",
  brand: "[&_*]:fill-brand [&_*]:stroke-brand",
  bookmark: "[&_*]:fill-bookmark [&_*]:stroke-bookmark",
  default: "",
};

interface Props extends SVGProps<SVGSVGElement> {
  name: keyof typeof Icons;
  color?: keyof typeof colors;
}
const Icon = ({ name, color = "default", ...rest }: Props) => {
  const Svg = Icons[name] as FC<SVGProps<SVGSVGElement>>;

  return <Svg className={colors[color]} {...rest} />;
};

export default Icon;
