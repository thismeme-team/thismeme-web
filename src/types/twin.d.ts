import "twin.macro";

import type { css as cssImport, keyframes as keyframesImport } from "@emotion/react";
import type { CSSInterpolation } from "@emotion/serialize";
import type styledImport from "@emotion/styled";

declare module "twin.macro" {
  // The styled and css, keyframes imports
  const styled: typeof styledImport;
  const css: typeof cssImport;
  const keyframes: typeof keyframesImport;
}

declare module "react" {
  // The tw and css prop
  interface DOMAttributes<T> {
    tw?: string;
    css?: CSSInterpolation;
  }
}
