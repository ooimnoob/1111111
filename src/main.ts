import { Game } from './game';
import './style.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="game-container">
    <h1>2D射擊遊戲</h1>
    <div id="game"></div>
    <div class="instructions">
      <p>操作說明：</p>
      <ul>
        <li>←→ 方向鍵：移動飛船</li>
        <li>空白鍵：發射子彈</li>
      </ul>
    </div>
  </div>
`;

// 啟動遊戲
new Game();