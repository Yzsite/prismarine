import { test, expect } from 'vitest'
import { setup } from './mesherTester'
import { BlockNames } from '../../../../../src/mcDataTypes'

const version = '1.18.1'

const addPositions = [
  // [[0, 0, 0], 'diamond_block'],
  [[1, 0, 0], 'stone'],
  [[-1, 0, 0], 'stone'],
  [[0, 1, 0], 'stone'],
  [[0, -1, 0], 'stone'],
  [[0, 0, 1], 'stone'],
  [[0, 0, -1], 'stone'],
] as const

test('Known blocks are not rendered', () => {
  const { mesherWorld, getGeometry, pos, mcData } = setup(version, addPositions as any)

  let time = 0
  let times = 0
  const invalidBlocks = {}/*  as {[number, number]} */
  for (const block of mcData.blocksArray) {
    if (block.maxStateId! - block.minStateId! > 100) continue
    for (let i = block.minStateId!; i <= block.maxStateId!; i++) {
      if (block.transparent) continue
      mesherWorld.setBlockStateId(pos, i)
      const start = performance.now()
      const { centerFaces, totalTiles, centerTileNeighbors } = getGeometry()
      time += performance.now() - start
      times++
      if (centerFaces === 0 && centerTileNeighbors !== 0) {
        if (invalidBlocks[block.name]) continue
        invalidBlocks[block.name] = [i - block.minStateId!, centerTileNeighbors]
        // console.log('INVALID', block.name, centerTileNeighbors, i - block.minStateId)
      }
    }
  }
  console.log('Average time', time / times)
  // Fully expected
  expect(invalidBlocks).toMatchInlineSnapshot(`
      {
        "creeper_head": [
          0,
          6,
        ],
        "creeper_wall_head": [
          0,
          6,
        ],
        "dragon_head": [
          0,
          6,
        ],
        "dragon_wall_head": [
          0,
          6,
        ],
        "player_head": [
          0,
          6,
        ],
        "player_wall_head": [
          0,
          6,
        ],
        "powder_snow": [
          0,
          6,
        ],
        "skeleton_skull": [
          0,
          6,
        ],
        "skeleton_wall_skull": [
          0,
          6,
        ],
        "wither_skeleton_skull": [
          0,
          6,
        ],
        "wither_skeleton_wall_skull": [
          0,
          6,
        ],
        "zombie_head": [
          0,
          6,
        ],
        "zombie_wall_head": [
          0,
          6,
        ],
      }
    `)
})


test('Light calculated correctly', () => {
  const result = {} as Record<string, any>
  for (const block of ['oak_fence', 'oak_slab', 'soul_sand'] as BlockNames[]) {
    const positions = [
      [[0, 0, 0], block]
    ]
    const { getLights, setLight, reload } = setup('1.20.2', positions as any)
    setLight(0, 0, 0, 5)
    setLight(0, -1, 0, 10)
    setLight(0, 1, 0, 10)
    setLight(1, 0, 0, 10)
    setLight(-1, 0, 0, 10)
    setLight(0, 0, 1, 10)
    setLight(0, 0, -1, 10)
    reload()
    result[block] = getLights()
  }
  expect(result).toMatchInlineSnapshot(`
    {
      "oak_fence": {
        "down": 10,
        "east": 5,
        "north": 5,
        "south": 5,
        "up": 10,
        "west": 5,
      },
      "oak_slab": {
        "down": 10,
        "east": 10,
        "north": 10,
        "south": 10,
        "up": 5,
        "west": 10,
      },
      "soul_sand": {
        "down": 10,
        "east": 10,
        "north": 10,
        "south": 10,
        "up": 10,
        "west": 10,
      },
    }
  `)
})
