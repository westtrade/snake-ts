import { render } from './game'

const renderLoop = () => {
	render()
	window.requestAnimationFrame(renderLoop)
}

renderLoop()
