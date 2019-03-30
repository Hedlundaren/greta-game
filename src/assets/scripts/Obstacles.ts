import { THREE } from 'expo-three'
import { SceneData } from './Scene'
import { Haptic } from 'expo'
import { Obstacle } from './Obstacle';

export class Obstacles {
  private _obstacles: Obstacle[]
  private _numberOfobstacles: number

  constructor(sceneData: SceneData) {
    this._obstacles = []
    this._numberOfobstacles = 3

    for (let i = 0; i < this._numberOfobstacles; i++) {
      const obstacle = new Obstacle(sceneData)
      this._obstacles.push(obstacle)
    }
  }

  sprites() {
    const sprites = new THREE.Group()
    for (const obstacle of this._obstacles) {
      sprites.add(obstacle.sprite())
    }
    return sprites
  }

  collectObstacle(obstacle: Obstacle) {
    Haptic.selection()
    obstacle.reset()
  }

  render(deltaTime: number, playerPosition: THREE.Vector2) {
    for (const obstacle of this._obstacles) {
      if (obstacle.isCollected(playerPosition)) {
        this.collectObstacle(obstacle)
      }

      obstacle.render(deltaTime, playerPosition)
    }
  }
}
