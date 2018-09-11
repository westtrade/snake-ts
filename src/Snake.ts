import { Figure } from './Figure'
import { Game, Direction } from './Game'
import { hsl } from './utils'

export class Snake extends Figure {
	speedX: number = 0
	speedY: number = 0
	color: string = hsl(163, 50, 49)
	speed: number = 0.0001
	game: Game

	constructor(game: Game) {
		super()
		this.game = game
	}

	update(): void {
		this.body = this.body.map(
			(currentBlock: number): number =>
				currentBlock +
				currentBlock * this.speedX +
				currentBlock * this.speedY * this.game.rows
		)
	}

	changeDirection(direction: Direction): void {
		if (direction === Direction.Down) {
			this.speedX = 0
			this.speedY = this.speed
		}

		if (direction === Direction.Up) {
			this.speedX = 0
			this.speedY = -this.speed
		}

		if (direction === Direction.Left) {
			this.speedX = -this.speed
			this.speedY = 0
		}

		if (direction === Direction.Right) {
			this.speedX = this.speed
			this.speedY = 0
		}
	}
}
