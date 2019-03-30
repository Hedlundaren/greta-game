import { THREE } from 'expo-three'
import { Can } from './Can'
import { SceneData } from './Scene'
import { Haptic } from 'expo'
import { Player } from './Player';
import { Obstacle } from './Obstacle';

export class Collectibles {

  private _canSpawner: Player
  private _cans: Can[]
  private _numberOfCans: number
  private _currentCanIndex: number
  private _obstacles: Obstacle[]
  private _numberOfObstacles: number
  private _currentObstacleIndex: number
  private _framesOfCanSpawn: number
  private _framesOfNoCanSpawn: number
  private _frameCount: number
  private _state: 'SPAWN' | 'NO_SPAWN'

  constructor(sceneData: SceneData) {

    this._currentCanIndex = 0
    this._currentObstacleIndex = 0
    this._frameCount = 0
    this._state = 'NO_SPAWN'

    // COLLECTIBLES
    this._cans = []
    this._numberOfCans = 10
    this._framesOfCanSpawn = 200
    this._framesOfNoCanSpawn = 400

    const startingPosition = new THREE.Vector2(60, -20)
    this._canSpawner = new Player(startingPosition, sceneData)

    for (let i = 0; i < this._numberOfCans; i++) {
      const can = new Can(sceneData)
      this._cans.push(can)
    }

    // OBSTACLES
    this._obstacles = []
    this._numberOfObstacles = 3

    for (let i = 0; i < this._numberOfObstacles; i++) {
      const obstacle = new Obstacle(sceneData)
      this._obstacles.push(obstacle)
    }
  }

  sprites() {
    const sprites = new THREE.Group()
    for (const can of this._cans) {
      sprites.add(can.sprite())
    }
    for (const obstacle of this._obstacles) {
      sprites.add(obstacle.sprite())
    }
    sprites.add(this._canSpawner.mesh())
    return sprites
  }

  spawnObstacle() {
    this._obstacles[this._currentObstacleIndex].setPosition(new THREE.Vector2(this._canSpawner.position().x, -25))
    this._currentObstacleIndex++
    if (this._currentObstacleIndex > this._numberOfObstacles - 1) {
      this._currentObstacleIndex = 0
    }
  }

  spawnCan() {
    const currentPos = this._canSpawner.position()
    const lastCanIndex = this._currentCanIndex === 0 ? this._numberOfCans - 1 : this._currentCanIndex - 1
    const lastPos = this._cans[lastCanIndex].getPosition()
    const diffX = currentPos.x - lastPos.x
    const diffY = currentPos.y - lastPos.y
    const distance = new THREE.Vector2(diffX, diffY).length()

    if (distance > 20) {
      this._cans[this._currentCanIndex].setPosition(new THREE.Vector2(currentPos.x, currentPos.y))
      this._currentCanIndex++
      if (this._currentCanIndex > this._numberOfCans - 1) {
        this._currentCanIndex = 0
      }
    }
  }

  collisionObstacle(obstacle: Obstacle) {
    Haptic.selection()
    obstacle.reset()
  }

  collisionCan(can: Can) {
    Haptic.selection()
    can.reset()
  }

  render(time: number, deltaTime: number, playerPosition: THREE.Vector2) {

    if (this._state === 'SPAWN') {
      if (this._frameCount > this._framesOfCanSpawn) {
        this._state = 'NO_SPAWN'
        this._frameCount = 0
      } else {
        this.spawnCan()
      }
    }
    
    if (this._state === 'NO_SPAWN') {
      if (this._frameCount > this._framesOfNoCanSpawn) {
        this._state = 'SPAWN'
        this._frameCount = 0
      }
    }




    if (Math.abs(this._canSpawner.velocity().y) < 0.5 && this._canSpawner.position().y > 0) {
      if (!this._canSpawner.isDashing()) {
        this.spawnObstacle()
      }
    }

    for (const obstacle of this._obstacles) {
      if (obstacle.isCollected(playerPosition)) {
        this.collisionObstacle(obstacle)
      }

      obstacle.render(deltaTime, playerPosition)
    }

    for (const can of this._cans) {
      if (can.isCollected(playerPosition)) {
        this.collisionCan(can)
      }

      if (Math.round(Math.random() * 300) === 1) {
        this._canSpawner.jump()
      }

      if (Math.round(Math.random() * 700) === 1) {
        this._canSpawner.dash()
      }

      can.render(deltaTime, playerPosition)
    }

    this._canSpawner.render(time, deltaTime)
    this._frameCount++
  }
}
