import { Point } from "../../../include/types";
import GameObject from "../../game-object";
export interface ICollider {
    contains(p: Point): boolean;
    touches(p: Point): boolean;
    moveTo(p: Point): void;
    collisionPointsWith(other: ICollider): Point[] | undefined;
}
export declare type Collision = {
    other: GameObject;
    points: Point[];
    collider: ICollider;
};
