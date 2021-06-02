export declare global {
    declare abstract class GameObject {
        private _name;
        constructor(_name: string);
        private _parent;
        private readonly _children;
        private readonly _event;
        readonly components: ComponentsList;
        readonly position: Position2D;
        positionChanged: GameEvent<[Position2D]>;
        get name(): string;
        get children(): any[];
        get parent(): GameObject;
        get event(): EventTarget;
        abstract draw(ctx: CanvasRenderingContext2D): void;
        forAllChildren(func: (gObj: GameObject) => any): void;
        addComponent(component: Utilities.Constructor<Component>): void;
        getComponent<T extends Component>(component: Utilities.Constructor<T>, raiseError?: boolean): T;
        hasComponent<T extends Component>(component: Utilities.Constructor<T>): boolean;
        bindKeyPress(targetKey: Inputs.KeyCode, callback: () => {}): void;
        bindKeyDown(targetKey: string, callback: Function): void;
        bindKeyUp(targetKey: string, callback: Function): void;
        bindMouseClick(callback: (ev: MouseEvent) => any, isMouseOver?: boolean): void;
    }
    export declare class Rect extends GameObject {
        constructor(name: string);
        color: UI.Color;
        width: number;
        height: number;
        draw(ctx: CanvasRenderingContext2D): void;
    }
    declare enum SceneType {
        /**
         * Don't use that
         */
        Scene0D = 0,
        /**
         * Don't use that
         */
        Scene1D = 1,
        /**
         * You can use that
         */
        Scene2D = 2,
        /**
         * You can use that
         */
        Scene3D = 3,
        /**
         * Don't use that
         */
        Scene4D = 4
    }
    declare abstract class Scene {
        private sceneName;
        private sceneType;
        constructor(sceneName: string, sceneType: SceneType);
        private _updateInterval;
        protected readonly _canvas: HTMLCanvasElement;
        protected readonly abstract _context: Context;
        readonly gameObjects: GameObject[];
        private _updateLoopDone;
        get name(): string;
        get type(): SceneType;
        activate(): void;
        forAllObjects(func: (gObj: GameObject) => any): void;
        deactivate(): void;
        addGameObject(gameObject: GameObject): void;
        removeGameObject(gameObject: GameObject): void;
        abstract update(): void;
    }
    export declare class Scene2D extends Scene {
        constructor(sceneName: string);
        _context: CanvasRenderingContext2D;
        update(): void;
    }
    export declare class Scene3D extends Scene {
        constructor(sceneName: string);
        _context: WebGLRenderingContext;
        update(): void;
    }
    export declare class Component {
        constructor(gameObject: GameObject);
        private _gameObject;
        private _enabled;
        readonly name: string;
        get gameObject(): GameObject;
        enable(v?: boolean): void;
        get enabled(): boolean;
    }
    export declare class Position2D extends Component {
        /** @param {Number} x  The object's location on the X-axis */
        private _x;
        /** @param {Number} y The object's location on the Y-axis */
        private _y;
        constructor(gameObject: GameObject);
        /**
         * Moves the object in the X-axis and Y-axis relative to itself
         * @param {Number} x
         * @param {Number} y
         */
        translate(x: _Math.Vector2): _Math.Vector2;
        translate(x: number, y: number): _Math.Vector2;
        set(x: number, y: number, dispatchEvent: boolean): void;
        set(position: _Math.Vector2, dispatchEvent: boolean): void;
        get x(): number;
        set x(x: number);
        get y(): number;
        set y(y: number);
        get coords(): _Math.Point2D;
        get enabled(): any;
        set enabled(v: any);
    }
    interface ICollider {
        contains(p: _Math.Point2D | _Math.Point3D): boolean;
        touches(p: _Math.Point2D | _Math.Point3D): boolean;
        moveTo(p: _Math.Point2D | _Math.Point3D): void;
        collisionPointsWith(other: ICollider): _Math.Point2D[] | _Math.Point3D[] | undefined;
    }
    export declare class BoxCollider2D implements ICollider {
        x: number;
        y: number;
        r: number;
        w: number;
        h: number;
        constructor(x: number, y: number, r: number, w: number, h: number);
        contains(p: _Math.Point2D): boolean;
        touches(p: _Math.Point2D): boolean;
        collisionPointsWith(other: BoxCollider2D): _Math.Point2D[] | undefined;
        moveTo(p: _Math.Point2D): void;
        get angle(): number;
        set angle(degrees: number);
        private _box;
        private _rotationMatrix;
    }
    export declare class CircleCollider2D implements ICollider {
        private _center;
        private _radius;
        constructor(_center: _Math.Point2D, _radius: number);
        get center(): _Math.Point2D;
        get radius(): number;
        contains(p: _Math.Point2D): boolean;
        touches(p: _Math.Point2D): boolean;
        moveTo(p: _Math.Point2D): void;
        collisionPointsWith(other: ICollider): _Math.Point2D[];
    }
    export declare class Collider extends Component {
        protected readonly _colliders: ICollider[];
        collisionOverlap: GameEvent<[Collision]>;
        collisionBegin: GameEvent<[Collision]>;
        collisionEnd: GameEvent<[Collision]>;
        private _isColliding;
        get isColliding(): boolean;
        set isColliding(v: boolean);
    }
    export declare class Collider2D extends Collider {
        constructor(gameObject: GameObject);
        addCollider(collider: ICollider): void;
        private _updateColliders;
        get colliders(): ICollider[];
    }
    export declare class Collision {
        other: GameObject;
        points: _Math.Point2D[] | _Math.Point3D[];
        collider: ICollider;
    }
    declare module Utilities {
        function areOfType<T>(obj: any[], cls: Constructor<T>, raiseError?: boolean): boolean;
        function isOfType<T>(obj: any, cls: Constructor<T>, raiseError?: boolean): boolean;
        function defineCustomObject(tagName: string, elementClass?: any): void;
        type Constructor<T> = {
            new(...args: any[]): T;
        };
    }
}
