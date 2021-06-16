import _Math from "../../../include/math";
import { Vertices } from "../../../include/types";
export default class AxisAlignedBoundingBox {
    constructor(l: number, t: number, r: number, b: number);
    constructor(root: _Math.Point2D, w: number, h: number);
    constructor(center: _Math.Point2D, extent: _Math.Vector2);
    private _L;
    private _T;
    private _R;
    private _B;
    get W(): number;
    get H(): number;
    get L(): number;
    get T(): number;
    get R(): number;
    get B(): number;
    get vertices(): _Math.Point2D[];
    verticesAsObject(): Vertices;
    translate(v: _Math.Vector2): void;
    moveTo(p: _Math.Point2D): void;
    contains(p: _Math.Point2D): boolean;
    touches(p: _Math.Point2D): boolean;
}
