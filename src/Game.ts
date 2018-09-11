export const CELL_SIZE: number = 20

export enum Direction {
	Up = 38,
	Down = 40,
	Left = 37,
	Right = 39
}

export interface GameBlock {
	x: number
	y: number
	width: number
	height: number
}

export interface GridPosition {
	col: number
	row: number
	blockNumber: number
	cols: number
	rows: number
}

export interface GameConstraints extends GameBlock {}

export class Game {
	ctx: CanvasRenderingContext2D
	cellSize: number = CELL_SIZE

	constructor(ctx: CanvasRenderingContext2D) {
		this.ctx = ctx
	}

	get width(): number {
		return this.ctx.canvas.width
	}

	get height(): number {
		return this.ctx.canvas.height
	}

	get rows(): number {
		return this.height / this.cellSize
	}

	get cols(): number {
		return this.width / this.cellSize
	}

	get totalCels(): number {
		return this.rows * this.cols
	}

	get constraints(): GameConstraints {
		return {
			x: this.cellSize,
			y: this.cellSize,
			width: this.width - this.cellSize,
			height: this.height - this.cellSize
		}
	}

	calculateGridPosition(blockNumber: number): GridPosition {
		const { cols, rows } = this
		const col = blockNumber % rows
		const row = blockNumber === 0 ? 0 : rows / (blockNumber - col)

		const position: GridPosition = {
			col,
			row,
			blockNumber,
			cols,
			rows
		}

		return position
	}

	calculatePosition(blockNumber: number): GameBlock {
		blockNumber = parseInt(blockNumber.toString())

		const constraints: GameConstraints = this.constraints
		const { col, row } = this.calculateGridPosition(blockNumber)

		return {
			x: col * this.cellSize,
			y: row * this.cellSize,
			width: this.cellSize,
			height: this.cellSize
		}
	}
}
