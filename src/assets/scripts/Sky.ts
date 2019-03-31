import { THREE } from 'expo-three'

import { fragmentShaderSky } from '../shaders/fragmentShaderSky'
import { vertexShaderSky } from '../shaders/vertexShaderSky'
import { SceneData } from './Scene'

export class Sky {
  private _mesh: THREE.Mesh
  private _material: THREE.ShaderMaterial

  constructor(width: number, height: number) {

    this._material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0.0 },
        resolution: { value: new THREE.Vector2(width, height) },
      },
      vertexShader: vertexShaderSky,
      fragmentShader: fragmentShaderSky
    })

    const geometry = new THREE.PlaneGeometry(200, 400, 1)
    this._mesh = new THREE.Mesh(geometry, this._material)

    this._mesh.position.set(0, 0, -2)
  }

  sprite() {
    return this._mesh
  }

  render(time: number, deltaTime: number) {
      this._material.uniforms.time.value = time
  }
}