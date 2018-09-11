const CELL_SIZE: number = 20

const hsl = (h: number = 0, s: number = 0, l: number = 0): string =>
	`hsl(${h}, ${s}%, ${l}%)`

enum Direction {
	Up = 38,
	Down = 40,
	Left = 37,
	Right = 39
}

export class Snake {
	x: number = 0
	y: number = 0
	speedX: number = 0
	speedY: number = 0
	color: string = hsl(163, 50, 49)

	update() {
		this.x = this.x + this.speedX * CELL_SIZE
		this.y = this.y + this.speedY * CELL_SIZE
	}

	dir(direction: Direction) {
		if (direction === Direction.Down) {
			this.speedX = 0
			this.speedY = 0.1
		}

		if (direction === Direction.Up) {
			this.speedX = 0
			this.speedY = -0.1
		}

		if (direction === Direction.Left) {
			this.speedX = -0.1
			this.speedY = 0
		}

		if (direction === Direction.Right) {
			this.speedX = 0.1
			this.speedY = 0
		}
	}
}

export interface Game {
	width: number
	height: number
}

export interface RenderContext {
	game: Game
}

export const createCanvas = (): HTMLCanvasElement =>
	<HTMLCanvasElement>document.getElementById('game')

const clearCanvas = (ctx: CanvasRenderingContext2D) =>
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

const drawBackground = (ctx: CanvasRenderingContext2D) => {
	ctx.fillStyle = 'hsl(192, 45%, 2%)'
	ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}

const drawWalls = (ctx: CanvasRenderingContext2D) => {
	ctx.fillStyle = 'hsl(112, 50%, 63%)'
	const { width, height } = ctx.canvas

	ctx.fillRect(0, 0, CELL_SIZE, height)
	ctx.fillRect(0, 0, width, CELL_SIZE)

	ctx.fillRect(width - CELL_SIZE, 0, CELL_SIZE, height)
	ctx.fillRect(0, height - CELL_SIZE, width, CELL_SIZE)
}

const drawSnake = (ctx: CanvasRenderingContext2D, snake: Snake) => {
	const { x, y } = snake

	ctx.fillStyle = snake.color
	ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE)
}

const player = new Snake()
const ctx: CanvasRenderingContext2D = createCanvas().getContext('2d')

document.addEventListener('keydown', (event: KeyboardEvent) =>
	player.dir(event.keyCode)
)

export const render = (): void => {
	player.update()

	clearCanvas(ctx)
	drawBackground(ctx)
	drawWalls(ctx)

	drawSnake(ctx, player)
}
