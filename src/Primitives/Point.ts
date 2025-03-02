export class Point {
    public x: number;
    public y: number;
    public z: number;

    constructor(x: number, y: number, z: number = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    };

    public equals(p: Point) {
        return p.x === this.x && p.y === this.y;
    }

    public draw(
        ctx: CanvasRenderingContext2D,
        { size = 18, color = "black", outline = false, fill = false }: DrawPointProps = {}
    ): void {
        const rad = size / 2;
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(this.x, this.y, rad, 0, Math.PI * 2);
        ctx.fill();
        if (outline) {
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "yellow";
            ctx.arc(this.x, this.y, rad * 0.6, 0, Math.PI * 2);
            ctx.stroke();
        }
        if (fill) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, rad * 0.4, 0, Math.PI * 2);
            ctx.fillStyle = "yellow";
            ctx.fill();
        }
    }
}

type DrawPointProps = {
    size?: number;
    color?: string;
    outline?: boolean;
    fill?: boolean;
};