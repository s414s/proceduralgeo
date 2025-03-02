import { getNearestPoint } from "../Math/Utils";
import { Graph } from "./Graph";
import { Point } from "./Point";

export class GraphEditor {
    private readonly _canvas: HTMLCanvasElement;
    private _selected: Point | null = null;
    private _hovered: Point | null = null;
    private _dragging: boolean = false;
    private readonly _ctx: CanvasRenderingContext2D;
    private readonly _graph: Graph;

    constructor(canvas: HTMLCanvasElement, graph: Graph) {
        this._canvas = canvas;
        this._graph = graph;

        const cvs = canvas.getContext("2d");
        if (!cvs) {
            throw new Error("2D context not supported or canvas already initialized");
        }

        this._selected = null;

        this._ctx = cvs;
        this.addEventListeners();
    }

    private removePoint(p: Point) {
        this._graph.removePoint(p);
        this._hovered = null;
        if (this._selected === p) {
            this._selected = null;
        }
    }

    private addEventListeners() {
        this._canvas.addEventListener("mousedown", (e) => {
            if (e.button === 2) { // right click (remove point)
                if (this._hovered) {
                    // this._graph.removePoint(this._hovered);
                    this.removePoint(this._hovered);
                }
            }

            if (e.button === 0) { // left click 
                const mouse = new Point(e.offsetX, e.offsetY);
                // this._hovered = getNearestPoint(mouse, this._graph.points, 10);
                if (this._hovered) {
                    this._selected = this._hovered;
                    this._dragging = true;
                    return;
                }

                this._graph.addPoint(mouse);
                this._selected = mouse;
                this._hovered = mouse;
            }
        });

        this._canvas.addEventListener("mousemove", (e) => {
            const mouse = new Point(e.offsetX, e.offsetY);
            this._hovered = getNearestPoint(mouse, this._graph.points, 10);
            if (this._dragging && this._selected) {
                this._selected.x = mouse.x;
                this._selected.y = mouse.y;
            }
        });

        this._canvas.addEventListener("contextmenu", (e) => e.preventDefault());
        this._canvas.addEventListener("mouseup", () => this._dragging = false);
    }

    public display() {
        this._graph.draw(this._ctx);
        if (this._hovered) {
            this._hovered.draw(this._ctx, { fill: true });
        }
        if (this._selected) {
            this._selected.draw(this._ctx, { outline: true });
        }
    }
}
