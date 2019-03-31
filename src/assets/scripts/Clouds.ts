import { THREE, Texture, Sprite } from 'expo-three'

export class Clouds {
  private _texture: Texture
  private _sprite1: Sprite
  private _sprite2: Sprite
  private _speed: number

  constructor(texture: Texture, speed: number) {
    this._texture = texture
    this._speed = speed
    var spriteMaterial = new THREE.SpriteMaterial({ map: this._texture, color: 0xffffff });
    this._sprite1 = new THREE.Sprite(spriteMaterial);
    this._sprite2 = new THREE.Sprite(spriteMaterial);
    this._sprite1.scale.set(500, 133.4, 1)
    this._sprite2.scale.set(503, 133.4, 1)
    this._sprite1.position.set(-250, 40, -1)
    this._sprite2.position.set(250, 40, -1)
  }

  sprite() {
    const group = new THREE.Group()
    group.add(this._sprite1)
    group.add(this._sprite2)
    return group
  }

  render(time: number, deltaTime: number) {
    this._sprite1.position.x -= this._speed * deltaTime
    this._sprite2.position.x -= this._speed * deltaTime

    const color = `rgb(250, 250, 250)`
    this._sprite1.material.color = new THREE.Color(color)
    this._sprite2.material.color = new THREE.Color(color)
    this._sprite1.material.opacity = 0.5
    this._sprite2.material.opacity = 0.5

    if (this._sprite1.position.x < -300) {
      this._sprite1.position.x = 700
    }
    if (this._sprite2.position.x < -300) {
      this._sprite2.position.x = 700
    }
  }
}