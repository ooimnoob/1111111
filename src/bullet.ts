export class Bullet {
    private x: number;
    private y: number;
    private speed: number;
    private size: number;
    
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.speed = 7;
        this.size = 5;
    }
    
    update(): void {
        this.y -= this.speed;  // 子彈向上移動
    }
    
    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = '#ffff00';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
    
    isOffScreen(): boolean {
        return this.y < 0;
    }
    
    getPosition(): {x: number, y: number, size: number} {
        return {x: this.x, y: this.y, size: this.size};
    }
}