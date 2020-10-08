import * as THREE from 'three'

export default function layerToObject(layer, index, isPerspectiveMode) {
  const material = new THREE.MeshBasicMaterial({
    color: layer.color,
    transparent: true,
    opacity: isPerspectiveMode ? 0.7 : 0.9,
  })

  let geometry
  switch (layer.type) {
    case 'rect':
      geometry = new THREE.PlaneBufferGeometry(layer.width, layer.height)
      break
    case 'triangle':
      geometry = new THREE.Geometry()
      const v1 = new THREE.Vector3(0, layer.height / 2, 0)
      const v2 = new THREE.Vector3(-layer.width / 2, -layer.height / 2, 0)
      const v3 = new THREE.Vector3(layer.width / 2, -layer.height / 2, 0)
      const triangle = new THREE.Triangle(v1, v2, v3)
      const normal = triangle.getNormal(new THREE.Vector3(0, 0, 0))
      geometry.vertices.push(triangle.a)
      geometry.vertices.push(triangle.b)
      geometry.vertices.push(triangle.c)
      geometry.faces.push(new THREE.Face3(0, 1, 2, normal))
      break
    case 'circle':
      geometry = new THREE.CircleGeometry(layer.diameter / 2, 64)
      break
    default:
      throw new Error('Unknown layer type')
  }

  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.x = layer.x
  mesh.position.y = layer.y
  mesh.position.z = isPerspectiveMode ? index * 0.01 : 0
  mesh.rotation.z = layer.rotation
  return mesh
}
