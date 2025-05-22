export class Enemy {
    private x: number;
    private y: number;
    private speed: number;
    private size: number;
    
    constructor(x: number) {
        this.x = x;
        this.y = 0;
        this.speed = 2;
        this.size = 20;
    }
    
    update(): void {
        this.y += this.speed;  // 敵人向下移動
    }
    
    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = '#ff0000';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
    
    isOffScreen(canvasHeight: number): boolean {
        return this.y > canvasHeight;
    }
    
    getPosition(): {x: number, y: number, size: number} {
        return {x: this.x, y: this.y, size: this.size};
    }
}