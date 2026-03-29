import type { RoastLevel } from "../types/coffee";
import type { FlavorModifier } from "../types/questionnaire";

/** 各焙煎度がどの味覚軸に影響するか（参考用データ） */
export const roastCharacteristics: Record<RoastLevel, FlavorModifier> = {
  light: {
    acidity: 3,
    fruitiness: 2,
    floral: 2,
    cleanness: 2,
    bitterness: -1,
    body: -1,
  },
  "medium-light": {
    acidity: 2,
    fruitiness: 1,
    sweetness: 2,
    cleanness: 1,
  },
  medium: {
    sweetness: 2,
    nuttiness: 1,
    chocolaty: 1,
    body: 1,
  },
  "medium-dark": {
    bitterness: 1,
    body: 2,
    chocolaty: 2,
    roastiness: 1,
    acidity: -1,
  },
  dark: {
    bitterness: 3,
    body: 3,
    roastiness: 3,
    acidity: -2,
    fruitiness: -1,
    floral: -1,
  },
};
