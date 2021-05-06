declare module UI {
    class Color {
        private _r;
        private _g;
        private _b;
        private _a;
        constructor(color: Color);
        constructor(hex_string: string);
        constructor(r: number, g: number, b: number, a: number | void);
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
