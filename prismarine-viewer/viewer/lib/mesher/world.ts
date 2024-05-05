import Chunks from 'prismarine-chunk'
import mcData from 'minecraft-data'
import { Block } from "prismarine-block"
import { Vec3 } from 'vec3'
import moreBlockDataGeneratedJson from '../moreBlockDataGenerated.json'
import { defaultMesherConfig } from './shared'

const ignoreAoBlocks = Object.keys(moreBlockDataGeneratedJson.noOcclusions)

function columnKey (x, z) {
  return `${x},${z}`
}

function isCube (shapes) {
  if (!shapes || shapes.length !== 1) return false
  const shape = shapes[0]
  return shape[0] === 0 && shape[1] === 0 && shape[2] === 0 && shape[3] === 1 && shape[4] === 1 && shape[5] === 1
}

export type WorldBlock = Block & {
  variant?: any
  // todo
  isCube: boolean
}


export class World {
  config = defaultMesherConfig
  Chunk: typeof import('prismarine-chunk/types/index').PCChunk
  columns = {} as { [key: string]: import('prismarine-chunk/types/index').PCChunk }
  blockCache = {}
  biomeCache: { [id: number]: mcData.Biome }

  constructor(version) {
    this.Chunk = Chunks(version) as any
    this.biomeCache = mcData(version).biomes
    this.config.version = version
  }

  getLight (pos: Vec3, isNeighbor = false) {
    const { enableLighting, skyLight } = this.config
    if (!enableLighting) return 15
    // const key = `${pos.x},${pos.y},${pos.z}`
    // if (lightsCache.has(key)) return lightsCache.get(key)
    const column = this.getColumnByPos(pos)
    if (!column || !hasChunkSection(column, pos)) return 15
    let skyLightBlock = column.getSkyLight(posInChunk(pos));
    if (skyLightBlock === 0) skyLightBlock = column.getSkyLight(posInChunk(pos.offset(0, 1, 0)));
    let result = Math.min(
      15,
      Math.max(
        column.getBlockLight(posInChunk(pos)),
        Math.min(skyLight, skyLightBlock)
      )
    )
    // lightsCache.set(key, result)
    if (result === 2 && this.getBlock(pos)?.name.match(/_stairs|slab/)) { // todo this is obviously wrong
      result = this.getLight(pos.offset(0, 1, 0))
    }
    if (isNeighbor && result === 2) result = 15 // TODO
    return Math.max(result / 15, 0.25)
  }

  addColumn (x, z, json) {
    const chunk = this.Chunk.fromJson(json)
    this.columns[columnKey(x, z)] = chunk as any
    return chunk
  }

  removeColumn (x, z) {
    delete this.columns[columnKey(x, z)]
  }

  getColumn (x, z) {
    return this.columns[columnKey(x, z)]
  }

  setBlockStateId (pos: Vec3, stateId) {
    if (stateId === undefined) throw new Error('stateId is undefined')
    const key = columnKey(Math.floor(pos.x / 16) * 16, Math.floor(pos.z / 16) * 16)

    const column = this.columns[key]
    // null column means chunk not loaded
    if (!column) return false

    column.setBlockStateId(posInChunk(pos.floored()), stateId)

    return true
  }

  getColumnByPos (pos: Vec3) {
    return this.getColumn(Math.floor(pos.x / 16) * 16, Math.floor(pos.z / 16) * 16)
  }

  getBlock (pos: Vec3): WorldBlock | null {
    const key = columnKey(Math.floor(pos.x / 16) * 16, Math.floor(pos.z / 16) * 16)

    const column = this.columns[key]
    // null column means chunk not loaded
    if (!column) return null

    const loc = pos.floored()
    const locInChunk = posInChunk(loc)
    const stateId = column.getBlockStateId(locInChunk)

    if (!this.blockCache[stateId]) {
      const b = column.getBlock(locInChunk)
      //@ts-expect-error
      b.isCube = isCube(b.shapes)
      this.blockCache[stateId] = b
      Object.defineProperty(b, 'position', {
        get () {
          throw new Error('position is not reliable, use pos parameter instead of block.position')
        }
      })
    }

    const block = this.blockCache[stateId]
    if (block.name === 'flowing_water') block.name = 'water'
    if (block.name === 'flowing_lava') block.name = 'lava'
    // block.position = loc // it overrides position of all currently loaded blocks
    block.biome = this.biomeCache[column.getBiome(locInChunk)] ?? this.biomeCache[1] ?? this.biomeCache[0]
    if (block.name === 'redstone_ore') block.transparent = false
    return block
  }

  shouldMakeAo (block: WorldBlock | null) {
    return block?.isCube && !ignoreAoBlocks.includes(block.name)
  }
}

// todo export in chunk instead
const hasChunkSection = (column, pos) => {
  if (column._getSection) return column._getSection(pos)
  if (column.skyLightSections) {
    return column.skyLightSections[getLightSectionIndex(pos, column.minY)] || column.blockLightSections[getLightSectionIndex(pos, column.minY)]
  }
  if (column.sections) return column.sections[pos.y >> 4]
}

function posInChunk (pos) {
  return new Vec3(Math.floor(pos.x) & 15, Math.floor(pos.y), Math.floor(pos.z) & 15)
}

function getLightSectionIndex (pos, minY = 0) {
  return Math.floor((pos.y - minY) / 16) + 1
}
