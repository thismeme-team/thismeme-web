import type { SVGProps } from "react";

import * as Icons from "./assets";

type IconName = keyof typeof Icons;

interface Props extends SVGProps<SVGSVGElement> {
  name: IconName;
}
const Icon = ({ name, ...rest }: Props) => {
  const Svg = Icons[name];
  return <Svg {...rest} />;
};

export default Icon;
