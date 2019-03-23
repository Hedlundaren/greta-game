import { THREE, Texture, Sprite } from 'expo-three'

export class Background {
  private _texture: Texture
  private _sprite1: Sprite
  private _sprite2: Sprite

  constructor(texture: Texture) {
    this._texture = texture
    var spriteMaterial = new THREE.SpriteMaterial({ map: this._texture, color: 0xffffff });
    this._sprite1 = new THREE.Sprite(spriteMaterial);
    this._sprite2 = new THREE.Sprite(spriteMaterial);
    this._sprite1.scale.set(500, 133.4, 1)
    this._sprite2.scale.set(502, 133.4, 1)
    this._sprite1.position.set(-250, 0, -1)
    this._sprite2.position.set(250, 0, -1)

  }

  sprite() {
    const group = new THREE.Group()
    group.add(this._sprite1)
    group.add(this._sprite2)
    return group
  }

  render(deltaTime: number) {
    this._sprite1.position.x -= deltaTime
    this._sprite2.position.x -= deltaTime
    if (this._sprite1.position.x < -300) {
      this._sprite1.position.x = 700
    }
    if (this._sprite2.position.x < -300) {
      this._sprite2.position.x = 700
    }
  }
}