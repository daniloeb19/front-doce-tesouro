// styled.d.ts
import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        colors: {
            beigeLight: string,
            darkBrown: string,
            darkRed: string,
            oliveLight: string,
            reddishBrown: string,
        };
    }
}
