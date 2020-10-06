import randomColor from 'randomcolor'

export default function generateLayer(type, { x, y }) {
  const color = randomColor({
    luminosity: 'bright',
  })

  switch (type) {
    case 'rect':
      return {
        type: 'rect',
        width: 0.3,
        height: 0.3,
        color,
        x,
        y,
        rotation: 0,
      }
    case 'circle':
      return {
        type: 'circle',
        radius: 0.3,
        color,
        x,
        y,
        rotation: 0,
      }
    case 'triangle':
      return {
        type: 'triangle',
        width: 0.3,
        height: 0.3,
        color,
        x,
        y,
        rotation: 0,
      }
    default:
      throw new Error('Unknown layer type')
  }
}
