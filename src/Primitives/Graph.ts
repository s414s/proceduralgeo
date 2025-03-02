import { Point } from "./Point";
import { Segment } from "./Segment";

export class Graph {
    public points: Point[];
    public segments: Segment[];

    constructor(points: Point[] = [], segments: Segment[] = []) {
        this.points = points;
        this.segments = segments;
    };

    public addPoint(p: Point) {
        this.points.push(p);
    }

    public removePoint(p: Point) {
        this.points = this.points.filter(x => !x.equals(p));
    }

    public tryAddPoint(p: Point) {
        if (!this.containsPoint(p)) {
            this.addPoint(p);
            return true;
        }
        return false;
    }

    public addSegment(s: Segment) {
        this.segments.push(s);
    }

    public containsPoint(p: Point): boolean {
        return this.points.find(x => x.equals(p)) !== null;
    }

    public draw(ctx: CanvasRenderingContext2D) {
        for (const seg of this.segments) {
            seg.draw(ctx);
        }

        for (const point of this.points) {
            point.draw(ctx);
        }
    }
}