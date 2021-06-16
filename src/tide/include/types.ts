import _Math from "./math";

export type Vertices = {
    lt: Point,
    rt: Point,
    lb: Point,
    rb: Point
}

export type Point = _Math.Point2D | _Math.Point3D;