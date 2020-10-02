import * as THREE from 'three'

export default function layerToObject(layer) {
  let mesh
  switch (layer.type) {
    case 'rect':
      mesh = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(layer.width, layer.height),
        new THREE.MeshBasicMaterial({ color: layer.color, transparent: true, opacity: 0.9 }),
      )
      return mesh
    case 'triangle':
      const geom = new THREE.Geometry()
      const v1 = new THREE.Vector3(0, layer.height / 2, 0)
      const v2 = new THREE.Vector3(-layer.width / 2, -layer.height / 2, 0)
      const v3 = new THREE.Vector3(layer.width / 2, -layer.height / 2, 0)
      const triangle = new THREE.Triangle(v1, v2, v3)
      const normal = triangle.normal()
      geom.vertices.push(triangle.a)
      geom.vertices.push(triangle.b)
      geom.vertices.push(triangle.c)
      geom.faces.push(new THREE.Face3(0, 1, 2, normal))
      mesh = new THREE.Mesh(
        geom,
        new THREE.MeshBasicMaterial({ color: layer.color, transparent: true, opacity: 0.9 }),
      )
      return mesh
    default:
      throw new Error('Unknown layer type')
  }
}
