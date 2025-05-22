export class Player {
    private x: number;
    private y: number;
    private speed: number = 5;
    private size: number = 30;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    update(keys: Set<string>): void {
        if (keys.has('ArrowLeft')) {
            this.x = Math.max(this.size/2, this.x - this.speed);
        }
        if (keys.has('ArrowRight')) {
            this.x = Math.min(800 - this.size/2, this.x + this.speed);
        }
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = '#00ff00';
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.size/2, this.y + this.size/2);
        ctx.lineTo(this.x + this.size/2, this.y + this.size/2);
        ctx.closePath();
        ctx.fill();
    }

    getPosition(): {x: number, y: number} {
        return {x: this.x, y: this.y};
    }
}