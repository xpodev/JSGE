declare module UI {
    class Color {
        #private;
        constructor(r: number | Color, g: number, b: number, a?: number);
        get a(): number;
        set a(value: number);
        get r(): number;
        set r(value: number);
        get g(): number;
        set g(value: number);
        get b(): number;
        set b(value: number);
        static get black(): Color;
        static get red(): Color;
        static get green(): Color;
        static get blue(): Color;
        static get cyan(): Color;
        static get magenta(): Color;
        static get yellow(): Color;
        static get white(): Color;
        private validate;
    }
}
export default UI;
