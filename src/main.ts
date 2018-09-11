import { Game } from './Game'
import { Snake } from './Snake'
import { clearCanvas, drawBackground, drawSnake, drawWalls } from './drawers'

export const createCanvas = (): HTMLCanvasElement =>
	<HTMLCanvasElement>document.getElementById('game')

const calculateCollision = () => {}

const ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D>(
	createCanvas().getContext('2d')
)

// Setup
const game = new Game(ctx)
const player = new Snake(game)

document.addEventListener('keydown', (event: KeyboardEvent) =>
	player.changeDirection(event.keyCode)
)

const render = (): void => {
	player.update()

	clearCanvas(game)
	drawBackground(game)
	drawWalls(game)

	drawSnake(game, player)
}

export const loop = () => render() && window.requestAnimationFrame(loop)
