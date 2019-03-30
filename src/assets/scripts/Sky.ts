import { THREE, Texture, Sprite } from 'expo-three'

export class Sky {
  private _texture: Texture 
  private _sprite: Sprite
  private _speed: number
  private _material: THREE.SpriteMaterial

  constructor(texture: Texture, speed: number) {
    this._texture = texture
    this._speed = speed
    this._material = new THREE.SpriteMaterial({ map: this._texture, color: 0xffffff });
    this._sprite = new THREE.Sprite(this._material);
    this._sprite.scale.set(500, 133.4, 1)
    this._sprite.position.set(0, 0, -2)
  }

  sprite() {
    const group = new THREE.Group()
    group.add(this._sprite)
    return group
  }

  render(time: number, deltaTime: number) {
    this._sprite.position.x -= this._speed * deltaTime
    const skyColor = `rgb(50, 150, ${Math.round(255 * (Math.sin(0.4 * time) * 0.1 + 0.8))})`
    this._material.color.set(skyColor)
    if (this._sprite.position.x < -300) {
      this._sprite.position.x = 700
    }
  }
}