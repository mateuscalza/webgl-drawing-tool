export default function generateLayer(type) {
  switch (type) {
    case 'rect':
      return {
        type: 'rect',
        width: 0.3,
        height: 0.3,
        color: '#686de0',
        x: 0,
        y: 0,
        rotation: 0,
      }
    case 'circle':
      return {
        type: 'circle',
        radius: 0.3,
        color: '#eb4d4b',
        x: 0,
        y: 0,
        rotation: 0,
      }
    case 'triangle':
      return {
        type: 'triangle',
        width: 0.3,
        height: 0.3,
        color: '#f0932b',
        x: 0,
        y: 0,
        rotation: 0,
      }
    default:
      throw new Error('Unknown layer type')
  }
}
