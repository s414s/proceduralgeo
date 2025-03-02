import './style.css';
// import typescriptLogo from './typescript.svg';
// import viteLogo from '/vite.svg';
// import { setupCounter } from './counter.ts';
import { Graph } from './Primitives/Graph.ts';
import { Point } from './Primitives/Point.ts';
import { Segment } from './Primitives/Segment.ts';
import { GraphEditor } from './Primitives/GraphEditor.ts';

const myCanvas = document.querySelector<HTMLCanvasElement>('#myCanvas');
if (!myCanvas) {
  throw new Error("Canvas element not found");
}

const ctx = myCanvas.getContext("2d");
if (!ctx) {
  throw new Error("2D context not supported or canvas already initialized");
}

myCanvas.height = 600;
myCanvas.width = 600;

const p1 = new Point(200, 200);
const p2 = new Point(500, 200);
const p3 = new Point(400, 400);
const p4 = new Point(100, 300);

const s1 = new Segment(p1, p2);
const s2 = new Segment(p1, p3);
const s3 = new Segment(p1, p4);
const s4 = new Segment(p2, p3);

const graph = new Graph(
  [p1, p2, p3, p4],
  [s1, s2, s3, s4]);

// ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
// graph.draw(ctx);

const graphEditor = new GraphEditor(myCanvas, graph);

function animate() {
  const myCanvas = document.querySelector<HTMLCanvasElement>('#myCanvas');
  if (!myCanvas) {
    throw new Error("Canvas element not found");
  }

  const ctx = myCanvas.getContext("2d");
  if (!ctx) {
    throw new Error("2D context not supported or canvas already initialized");
  }

  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
  graphEditor.display();

  requestAnimationFrame(animate);
}

animate();


// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div>
//     <a href="https://vite.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://www.typescriptlang.org/" target="_blank">
//       <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
//     </a>
//     <h1>Vite + TypeScript</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite and TypeScript logos to learn more
//     </p>
//   </div>
// `;

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!);
