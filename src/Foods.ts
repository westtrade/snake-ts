import { Figure } from './Figure'

export class Foods extends Figure {
	get total(): number {
		return this.body.length
	}

	generate() {}
}
