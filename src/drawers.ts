import { Snake } from './Snake'
import { Game, GameBlock } from './Game'
import { hsl } from './utils'

export const clearCanvas = (game: Game) =>
	game.ctx.clearRect(0, 0, game.width, game.height)

export const drawBackground = (game: Game) => {
	const { ctx } = game
	ctx.fillStyle = hsl(192, 45, 2)
	ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}

export const drawWalls = (game: Game) => {
	const { ctx, width, height } = game

	ctx.fillStyle = hsl(112, 50, 63)

	ctx.fillRect(0, 0, game.cellSize, height)
	ctx.fillRect(0, 0, width, game.cellSize)

	ctx.fillRect(width - game.cellSize, 0, game.cellSize, height)
	ctx.fillRect(0, height - game.cellSize, width, game.cellSize)
}

export const drawGameBlock = (
	ctx: CanvasRenderingContext2D,
	block: GameBlock,
	color = '#000'
): void => {
	ctx.fillStyle = color
	ctx.fillRect(block.x, block.y, block.width, block.height)
}

export const drawSnake = (game: Game, snake: Snake) => {
	const { ctx } = game
	const { body = [] } = snake
	ctx.fillStyle = snake.color

	for (let chunkCellNumber of body) {
		const bodyBlock: GameBlock = game.calculatePosition(chunkCellNumber)
		drawGameBlock(game.ctx, bodyBlock, snake.color)
	}
}
