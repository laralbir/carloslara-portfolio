import React, { useState, useEffect, useRef, useCallback } from "react";
import { RotateCcw, ArrowLeft, ArrowRight, Crosshair, Volume2, VolumeX, Terminal } from "lucide-react";

type GameMode = "invaders" | "arkanoid";

interface ZxSpectrumArcadeProps {
  initialMode?: GameMode;
  onExit: () => void;
}

const GRID_WIDTH = 28;
const GRID_HEIGHT = 12;

interface Invader {
  x: number;
  y: number;
  alive: boolean;
  type: number;
}

interface Bullet {
  x: number;
  y: number;
  dy: number;
}

interface Brick {
  x: number;
  y: number;
  width: number;
  alive: boolean;
  colorIndex: number;
}

export const ZxSpectrumArcade: React.FC<ZxSpectrumArcadeProps> = ({
  initialMode = "invaders",
  onExit,
}) => {
  const [mode, setMode] = useState<GameMode>(initialMode);
  const [score, setScore] = useState(0);
  const [hiScore, setHiScore] = useState(500);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [victory, setVictory] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [booting, setBooting] = useState(true);
  const [tick, setTick] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  // Space Invaders state refs
  const playerXRef = useRef<number>(Math.floor(GRID_WIDTH / 2));
  const invadersRef = useRef<Invader[]>([]);
  const invaderDirRef = useRef<number>(1);
  const bulletsRef = useRef<Bullet[]>([]);
  const stepCounterRef = useRef<number>(0);

  // Arkanoid state refs
  const paddleXRef = useRef<number>(Math.floor(GRID_WIDTH / 2) - 2);
  const ballRef = useRef<{ x: number; y: number; dx: number; dy: number }>({
    x: Math.floor(GRID_WIDTH / 2),
    y: GRID_HEIGHT - 3,
    dx: 1,
    dy: -1,
  });
  const bricksRef = useRef<Brick[]>([]);

  // 8-bit ZX Spectrum Beeper synthesizer (Web Audio API)
  const playBeep = useCallback(
    (freq: number, durationMs: number) => {
      if (!soundEnabled || typeof window === "undefined") return;
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "square";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + durationMs / 1000);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + durationMs / 1000);
      } catch {
        // Ignore audio errors on restricted environments
      }
    },
    [soundEnabled]
  );

  const initInvaders = useCallback(() => {
    playerXRef.current = Math.floor(GRID_WIDTH / 2);
    invaderDirRef.current = 1;
    bulletsRef.current = [];
    stepCounterRef.current = 0;

    const list: Invader[] = [];
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 7; col++) {
        list.push({
          x: 3 + col * 3,
          y: 1 + row * 2,
          alive: true,
          type: row,
        });
      }
    }
    invadersRef.current = list;
    setScore(0);
    setLives(3);
    setGameOver(false);
    setVictory(false);
    setTick((t) => t + 1);
  }, []);

  const initArkanoid = useCallback(() => {
    paddleXRef.current = Math.floor(GRID_WIDTH / 2) - 2;
    ballRef.current = {
      x: Math.floor(GRID_WIDTH / 2),
      y: GRID_HEIGHT - 3,
      dx: 1,
      dy: -1,
    };
    const bricks: Brick[] = [];
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 6; col++) {
        bricks.push({
          x: 2 + col * 4,
          y: 1 + row,
          width: 3,
          alive: true,
          colorIndex: row,
        });
      }
    }
    bricksRef.current = bricks;
    setScore(0);
    setLives(3);
    setGameOver(false);
    setVictory(false);
    setTick((t) => t + 1);
  }, []);

  const resetCurrentGame = useCallback(() => {
    if (mode === "invaders") {
      initInvaders();
    } else {
      initArkanoid();
    }
  }, [mode, initInvaders, initArkanoid]);

  // Brief ZX Spectrum ROM boot flash
  useEffect(() => {
    const timer = setTimeout(() => {
      setBooting(false);
    }, 350);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    resetCurrentGame();
  }, [mode, resetCurrentGame]);

  const moveLeft = useCallback(() => {
    if (gameOver || victory) return;
    if (mode === "invaders") {
      playerXRef.current = Math.max(1, playerXRef.current - 1);
    } else {
      paddleXRef.current = Math.max(1, paddleXRef.current - 2);
    }
    setTick((t) => t + 1);
  }, [mode, gameOver, victory]);

  const moveRight = useCallback(() => {
    if (gameOver || victory) return;
    if (mode === "invaders") {
      playerXRef.current = Math.min(GRID_WIDTH - 2, playerXRef.current + 1);
    } else {
      paddleXRef.current = Math.min(GRID_WIDTH - 6, paddleXRef.current + 2);
    }
    setTick((t) => t + 1);
  }, [mode, gameOver, victory]);

  const fireAction = useCallback(() => {
    if (gameOver || victory) {
      resetCurrentGame();
      return;
    }
    if (mode === "invaders") {
      const activePlayerBullets = bulletsRef.current.filter((b) => b.dy < 0);
      if (activePlayerBullets.length < 2) {
        bulletsRef.current.push({
          x: playerXRef.current,
          y: GRID_HEIGHT - 2,
          dy: -1,
        });
        playBeep(880, 45);
        setTick((t) => t + 1);
      }
    }
  }, [mode, gameOver, victory, resetCurrentGame, playBeep]);

  // Keyboard listener when terminal arcade is mounted
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A" || e.key === "o" || e.key === "O") {
        e.preventDefault();
        moveLeft();
      } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D" || e.key === "p" || e.key === "P") {
        e.preventDefault();
        moveRight();
      } else if (e.key === " " || e.key === "ArrowUp" || e.key === "w" || e.key === "W" || e.key === "q" || e.key === "Q") {
        e.preventDefault();
        fireAction();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [moveLeft, moveRight, fireAction]);

  // Game Loop
  useEffect(() => {
    if (booting || gameOver || victory) return;

    const interval = setInterval(() => {
      if (mode === "invaders") {
        stepCounterRef.current += 1;

        // 1. Move bullets
        const nextBullets: Bullet[] = [];
        let gainedScore = 0;
        let playerHit = false;

        for (const b of bulletsRef.current) {
          const ny = b.y + b.dy;
          if (ny < 0 || ny >= GRID_HEIGHT) continue;

          if (b.dy < 0) {
            // Check hit against alive invaders
            const hitInv = invadersRef.current.find(
              (inv) => inv.alive && Math.abs(inv.x - b.x) <= 1 && inv.y === ny
            );
            if (hitInv) {
              hitInv.alive = false;
              gainedScore += (3 - hitInv.type) * 20;
              playBeep(520, 60);
              continue;
            }
          } else {
            // Enemy bullet hitting player
            if (ny === GRID_HEIGHT - 1 && Math.abs(b.x - playerXRef.current) <= 1) {
              playerHit = true;
              playBeep(150, 180);
              continue;
            }
          }
          nextBullets.push({ ...b, y: ny });
        }
        bulletsRef.current = nextBullets;

        if (gainedScore > 0) {
          setScore((prev) => {
            const next = prev + gainedScore;
            if (next > hiScore) setHiScore(next);
            return next;
          });
        }

        if (playerHit) {
          setLives((prev) => {
            if (prev <= 1) {
              setGameOver(true);
              return 0;
            }
            return prev - 1;
          });
        }

        // 2. Move invaders every 3 ticks
        const aliveInvaders = invadersRef.current.filter((i) => i.alive);
        if (aliveInvaders.length === 0) {
          setVictory(true);
          playBeep(1046, 200);
          return;
        }

        if (stepCounterRef.current % 3 === 0) {
          let hitEdge = false;
          for (const inv of aliveInvaders) {
            if (
              (invaderDirRef.current > 0 && inv.x >= GRID_WIDTH - 3) ||
              (invaderDirRef.current < 0 && inv.x <= 2)
            ) {
              hitEdge = true;
              break;
            }
          }

          if (hitEdge) {
            invaderDirRef.current = -invaderDirRef.current;
            for (const inv of aliveInvaders) {
              inv.y += 1;
              if (inv.y >= GRID_HEIGHT - 2) {
                setGameOver(true);
              }
            }
          } else {
            for (const inv of aliveInvaders) {
              inv.x += invaderDirRef.current;
            }
          }

          // Random enemy laser
          if (Math.random() < 0.35 && aliveInvaders.length > 0) {
            const shooter = aliveInvaders[Math.floor(Math.random() * aliveInvaders.length)];
            bulletsRef.current.push({
              x: shooter.x,
              y: shooter.y + 1,
              dy: 1,
            });
          }
        }
      } else {
        // Arkanoid step
        const ball = ballRef.current;
        let nx = ball.x + ball.dx;
        let ny = ball.y + ball.dy;
        let ndx = ball.dx;
        let ndy = ball.dy;

        // Wall collisions
        if (nx <= 1 || nx >= GRID_WIDTH - 2) {
          ndx = -ndx;
          nx = ball.x + ndx;
          playBeep(440, 30);
        }
        if (ny <= 0) {
          ndy = -ndy;
          ny = ball.y + ndy;
          playBeep(440, 30);
        }

        // Paddle collision
        if (
          ndy > 0 &&
          ny === GRID_HEIGHT - 1 &&
          nx >= paddleXRef.current - 1 &&
          nx <= paddleXRef.current + 5
        ) {
          ndy = -1;
          ny = GRID_HEIGHT - 2;
          // Angle tweak on paddle edges
          if (nx <= paddleXRef.current + 1) ndx = -1;
          else if (nx >= paddleXRef.current + 3) ndx = 1;
          playBeep(660, 40);
        }

        // Brick collision
        for (const brick of bricksRef.current) {
          if (
            brick.alive &&
            ny === brick.y &&
            nx >= brick.x &&
            nx < brick.x + brick.width
          ) {
            brick.alive = false;
            ndy = -ndy;
            playBeep(784, 50);
            setScore((prev) => {
              const next = prev + (3 - brick.colorIndex) * 25;
              if (next > hiScore) setHiScore(next);
              return next;
            });
            break;
          }
        }

        // Check victory
        if (bricksRef.current.every((b) => !b.alive)) {
          setVictory(true);
          playBeep(1046, 200);
          return;
        }

        // Check bottom miss
        if (ny >= GRID_HEIGHT) {
          playBeep(140, 200);
          setLives((prev) => {
            if (prev <= 1) {
              setGameOver(true);
              return 0;
            }
            return prev - 1;
          });
          ballRef.current = {
            x: paddleXRef.current + 2,
            y: GRID_HEIGHT - 3,
            dx: 1,
            dy: -1,
          };
        } else {
          ballRef.current = { x: nx, y: ny, dx: ndx, dy: ndy };
        }
      }

      setTick((t) => t + 1);
    }, 180);

    return () => clearInterval(interval);
  }, [booting, mode, gameOver, victory, hiScore, playBeep]);

  // Render ASCII grid rows
  const renderAsciiRows = () => {
    const grid: string[][] = Array.from({ length: GRID_HEIGHT }, () =>
      Array.from({ length: GRID_WIDTH }, () => " ")
    );

    if (mode === "invaders") {
      // Draw Invaders
      for (const inv of invadersRef.current) {
        if (!inv.alive) continue;
        if (inv.y >= 0 && inv.y < GRID_HEIGHT && inv.x >= 1 && inv.x < GRID_WIDTH - 1) {
          const sprite = inv.type === 0 ? "👾" : inv.type === 1 ? "<W>" : "/M\\";
          if (sprite === "👾") {
            grid[inv.y][inv.x] = "¥";
            grid[inv.y][inv.x - 1] = "{";
            grid[inv.y][inv.x + 1] = "}";
          } else {
            grid[inv.y][inv.x - 1] = sprite[0];
            grid[inv.y][inv.x] = sprite[1];
            grid[inv.y][inv.x + 1] = sprite[2];
          }
        }
      }

      // Draw Bullets
      for (const b of bulletsRef.current) {
        if (b.y >= 0 && b.y < GRID_HEIGHT && b.x >= 0 && b.x < GRID_WIDTH) {
          grid[b.y][b.x] = b.dy < 0 ? "│" : "!";
        }
      }

      // Draw Player Turret
      const px = playerXRef.current;
      grid[GRID_HEIGHT - 1][Math.max(0, px - 1)] = "◢";
      grid[GRID_HEIGHT - 1][px] = "▲";
      grid[GRID_HEIGHT - 1][Math.min(GRID_WIDTH - 1, px + 1)] = "◣";
    } else {
      // Arkanoid Bricks
      for (const brick of bricksRef.current) {
        if (!brick.alive) continue;
        const ch = brick.colorIndex === 0 ? "█" : brick.colorIndex === 1 ? "▓" : "▒";
        for (let i = 0; i < brick.width; i++) {
          if (brick.x + i < GRID_WIDTH) {
            grid[brick.y][brick.x + i] = ch;
          }
        }
      }

      // Ball
      const { x: bx, y: by } = ballRef.current;
      if (by >= 0 && by < GRID_HEIGHT && bx >= 0 && bx < GRID_WIDTH) {
        grid[by][bx] = "●";
      }

      // Paddle
      const px = paddleXRef.current;
      for (let i = 0; i < 5; i++) {
        if (px + i >= 0 && px + i < GRID_WIDTH) {
          grid[GRID_HEIGHT - 1][px + i] = "═";
        }
      }
    }

    return grid.map((row) => row.join(""));
  };

  const rows = renderAsciiRows();
  void tick;

  return (
    <div
      ref={containerRef}
      data-testid="zx-spectrum-arcade"
      className="relative font-mono text-[11px] sm:text-xs bg-black text-[#eeeeee] rounded-xl p-2.5 sm:p-3 border-2 border-slate-700 shadow-inner select-none overflow-hidden"
    >
      {/* ZX Spectrum Iconic Diagonal Rainbow Stripe Corner */}
      <div
        aria-hidden="true"
        className="absolute -right-6 -bottom-6 w-20 h-20 rotate-45 pointer-events-none opacity-85"
        style={{
          background:
            "linear-gradient(90deg, #e5484d 0% 25%, #f5d90a 25% 50%, #30a46c 50% 75%, #0ea5e9 75% 100%)",
        }}
      />

      {/* Top Sinclair ZX Spectrum 48K Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-1.5 pb-2 mb-2 border-b border-slate-800">
        <div className="flex items-center gap-1.5">
          <span className="px-1.5 py-0.5 rounded bg-red-600 text-white text-[9px] font-extrabold tracking-wider">
            ZX SPECTRUM 48K
          </span>
          <div className="flex items-center rounded-lg bg-slate-900 p-0.5 border border-slate-700">
            <button
              type="button"
              data-testid="arcade-mode-invaders"
              onClick={() => setMode("invaders")}
              className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-colors ${
                mode === "invaders"
                  ? "bg-cyan-400 text-black"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              INVADERS
            </button>
            <button
              type="button"
              data-testid="arcade-mode-arkanoid"
              onClick={() => setMode("arkanoid")}
              className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-colors ${
                mode === "arkanoid"
                  ? "bg-amber-400 text-black"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              ARKANOID
            </button>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setSoundEnabled((s) => !s)}
            className="p-1 rounded bg-slate-900 border border-slate-700 text-slate-300 hover:text-amber-300 cursor-pointer"
            title={soundEnabled ? "Silenciar Beeper 48K" : "Activar sonido Beeper 48K"}
            aria-label="Toggle 8-bit sound"
          >
            {soundEnabled ? <Volume2 className="w-3 h-3 text-amber-400" /> : <VolumeX className="w-3 h-3" />}
          </button>
          <button
            type="button"
            onClick={resetCurrentGame}
            className="p-1 rounded bg-slate-900 border border-slate-700 text-slate-300 hover:text-cyan-400 cursor-pointer"
            title="Reiniciar partida"
            aria-label="Reset game"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
          <button
            type="button"
            onClick={onExit}
            className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 text-[10px] font-bold flex items-center gap-1 cursor-pointer"
            title="Volver al código"
          >
            <Terminal className="w-3 h-3 text-primary" />
            <span>CODE</span>
          </button>
        </div>
      </div>

      {/* Score & Lives Telemetry */}
      <div className="flex items-center justify-between text-[10px] font-mono mb-1.5 px-1 text-slate-300">
        <div>
          SCORE: <span className="text-amber-300 font-bold">{String(score).padStart(4, "0")}</span>
        </div>
        <div>
          HI: <span className="text-cyan-300 font-bold">{String(hiScore).padStart(4, "0")}</span>
        </div>
        <div>
          LIVES:{" "}
          <span className="text-red-400 font-bold">
            {"♥".repeat(Math.max(0, lives))}
          </span>
        </div>
      </div>

      {/* ASCII CRT Viewport */}
      <div className="relative bg-[#050508] border border-slate-800 rounded-lg py-1.5 px-2 flex flex-col items-center justify-center min-h-[175px]">
        {booting ? (
          <div className="text-left w-full py-8 px-3 bg-[#d7d7d7] text-black font-bold text-xs rounded">
            <p>10 LOAD "{mode.toUpperCase()}"</p>
            <p className="mt-2">© 1982 Sinclair Research Ltd</p>
          </div>
        ) : (
          <>
            <pre className="font-mono text-[11px] sm:text-xs leading-[1.15] tracking-widest text-emerald-400 select-none m-0">
              {rows.map((line, rIdx) => (
                <div
                  key={rIdx}
                  className={
                    rIdx === 0
                      ? "text-red-400 font-bold"
                      : rIdx <= 2
                      ? "text-amber-300 font-bold"
                      : rIdx <= 5
                      ? "text-cyan-300 font-bold"
                      : rIdx === GRID_HEIGHT - 1
                      ? "text-emerald-400 font-extrabold"
                      : "text-slate-100"
                  }
                >
                  {line}
                </div>
              ))}
            </pre>

            {(gameOver || victory) && (
              <div className="absolute inset-0 bg-black/85 backdrop-blur-[1px] flex flex-col items-center justify-center p-3 text-center">
                <div
                  className={`text-xs sm:text-sm font-extrabold px-2 py-0.5 rounded mb-1 ${
                    victory ? "bg-emerald-500 text-black" : "bg-red-600 text-white"
                  }`}
                >
                  {victory ? "🎉 STAGE CLEAR! 0 REVERTS" : "💥 GAME OVER — R TAPE LOADING ERROR"}
                </div>
                <p className="text-[10px] text-slate-300 mb-2">
                  © 1982 Sinclair Research Ltd · Score: {score}
                </p>
                <button
                  type="button"
                  onClick={resetCurrentGame}
                  className="px-3 py-1 rounded bg-amber-400 hover:bg-amber-300 text-black font-bold text-[11px] cursor-pointer shadow"
                >
                  PRESS FIRE / PLAY AGAIN
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Controls Bar (Keyboard + Mobile Touch Pad) */}
      <div className="mt-2 flex items-center justify-between gap-2 relative z-10">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={moveLeft}
            className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 active:bg-cyan-500 active:text-black border border-slate-700 text-slate-200 flex items-center gap-1 text-[10px] font-bold cursor-pointer"
            aria-label="Mover izquierda"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>LEFT</span>
          </button>
          <button
            type="button"
            onClick={moveRight}
            className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 active:bg-cyan-500 active:text-black border border-slate-700 text-slate-200 flex items-center gap-1 text-[10px] font-bold cursor-pointer"
            aria-label="Mover derecha"
          >
            <span>RIGHT</span>
            <ArrowRight className="w-3 h-3" />
          </button>
          {mode === "invaders" && (
            <button
              type="button"
              onClick={fireAction}
              className="px-2.5 py-1 rounded bg-red-600/90 hover:bg-red-500 active:scale-95 text-white border border-red-400/50 flex items-center gap-1 text-[10px] font-bold cursor-pointer"
              aria-label="Disparar láser"
            >
              <Crosshair className="w-3 h-3" />
              <span>FIRE</span>
            </button>
          )}
        </div>
        <div className="text-[9px] text-slate-400 hidden sm:block pr-4">
          © 1982 Sinclair · Keys: ←/→ {mode === "invaders" ? "+ Space" : ""}
        </div>
      </div>
    </div>
  );
};
