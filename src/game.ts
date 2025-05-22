import { Player } from './player';
import { Bullet } from './bullet';
import { Enemy } from './enemy';

export class Game {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private lastTime: number = 0;
    private player: Player;
    private bullets: Bullet[] = [];
    private enemies: Enemy[] = [];
    private keys: Set<string> = new Set();
    private score: number = 0;
    private enemySpawnTimer: number = 0;
    private enemySpawnInterval: number = 2000; // 每2秒產生一個敵人

    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = 800;
        this.canvas.height = 600;
        this.ctx = this.canvas.getContext('2d')!;
        document.body.appendChild(this.canvas);

        // 初始化玩家在畫面底部中間
        this.player = new Player(this.canvas.width / 2, this.canvas.height - 50);

        // 設置鍵盤事件監聽
        window.addEventListener('keydown', (e) => this.keys.add(e.key));
        window.addEventListener('keyup', (e) => this.keys.delete(e.key));
        window.addEventListener('keypress', (e) => {
            if (e.key === ' ') {
                this.shoot();
            }
        });

        this.start();
    }

    private shoot(): void {
        const pos = this.player.getPosition();
        this.bullets.push(new Bullet(pos.x, pos.y));
    }

    private spawnEnemy(): void {
        const x = Math.random() * (this.canvas.width - 40) + 20;
        this.enemies.push(new Enemy(x));
    }

    private checkCollisions(): void {
        // 檢查每個子彈是否擊中敵人
        this.bullets = this.bullets.filter(bullet => {
            const bulletPos = bullet.getPosition();
            
            for (let i = this.enemies.length - 1; i >= 0; i--) {
                const enemyPos = this.enemies[i].getPosition();
                const dx = bulletPos.x - enemyPos.x;
                const dy = bulletPos.y - enemyPos.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < (bulletPos.size + enemyPos.size)) {
                    this.enemies.splice(i, 1);
                    this.score += 100;
                    return false;
                }
            }
            return !bullet.isOffScreen();
        });

        // 移除超出畫面的敵人
        this.enemies = this.enemies.filter(enemy => !enemy.isOffScreen(this.canvas.height));
    }

    private start(): void {
        requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    }

    private gameLoop(timestamp: number): void {
        const deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;

        this.update(deltaTime);
        this.render();

        requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    }

    private update(deltaTime: number): void {
        // 更新玩家
        this.player.update(this.keys);

        // 更新所有子彈
        this.bullets.forEach(bullet => bullet.update());

        // 更新所有敵人
        this.enemies.forEach(enemy => enemy.update());

        // 產生新敵人
        this.enemySpawnTimer += deltaTime;
        if (this.enemySpawnTimer >= this.enemySpawnInterval) {
            this.spawnEnemy();
            this.enemySpawnTimer = 0;
        }

        // 檢查碰撞
        this.checkCollisions();
    }

    private render(): void {
        // 清除畫布
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // 繪製背景
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // 繪製玩家
        this.player.draw(this.ctx);

        // 繪製所有子彈
        this.bullets.forEach(bullet => bullet.draw(this.ctx));

        // 繪製所有敵人
        this.enemies.forEach(enemy => enemy.draw(this.ctx));

        // 繪製分數
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '20px Arial';
        this.ctx.fillText(`Score: ${this.score}`, 10, 30);
    }
}