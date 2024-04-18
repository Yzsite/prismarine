import { useEffect, useRef, useState } from 'react'
import { Transition } from 'react-transition-group'
import { createPortal } from 'react-dom'
import mojangson from 'mojangson'
import nbt from 'prismarine-nbt'
import { useSnapshot } from 'valtio'
import { getItemNameRaw, openItemsCanvas, openPlayerInventory, upInventoryItems } from '../playerWindows'
import { activeModalStack, isGameActive, miscUiState } from '../globalState'
import { MessageFormatPart } from '../botUtils'
import MessageFormatted from './MessageFormatted'
import MessageFormattedString from './MessageFormattedString'
import SharedHudVars from './SharedHudVars'


const ItemName = ({ itemKey }: { itemKey: string }) => {
  const nodeRef = useRef(null)
  const [show, setShow] = useState(false)
  const [itemName, setItemName] = useState<Record<string, any> | MessageFormatPart[] | string>('')

  const duration = 300

  const defaultStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: 'calc(var(--safe-area-inset-bottom) + 50px)',
    left: 0,
    right: 0,
    fontSize: 10,
    textAlign: 'center',
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
    pointerEvents: 'none',
  }

  const transitionStyles = {
    entering: { opacity: 1 },
    entered:  { opacity: 1 },
    exiting:  { opacity: 0 },
    exited:  { opacity: 0 },
  }

  useEffect(() => {
    const itemData = itemKey.split('_split_')
    if (!itemKey) {
      setItemName('')
    } else if (itemData[3]) {
      const itemNbt = nbt.simplify(JSON.parse(itemData[3]))
      const customName = itemNbt.display?.Name
      if (customName) {
        const parsed = mojangson.simplify(mojangson.parse(customName))
        setItemName(parsed)
      } else {
        setItemName(itemData[0])
      }
    } else {
      setItemName(itemData[0])
    }
    setShow(true)
    const id = setTimeout(() => {
      setShow(false)
    }, 1500)
    return () => {
      setShow(false)
      clearTimeout(id)
    }
  }, [itemKey])

  return <Transition nodeRef={nodeRef} in={show} timeout={duration} >
    {state => (
      <SharedHudVars>
        <div ref={nodeRef} style={{ ...defaultStyle, ...transitionStyles[state] }} className='item-display-name'>
          {typeof itemName === 'object' || typeof itemName === 'string' ? (
            <MessageFormattedString message={itemName} />
          ) : (
            <MessageFormatted parts={itemName} />
          )}
        </div>
      </SharedHudVars>
    )}
  </Transition>
}

export default () => {
  const container = useRef<HTMLDivElement>(null!)
  const [itemKey, setItemKey] = useState('')
  const hasModals = useSnapshot(activeModalStack).length

  useEffect(() => {
    const controller = new AbortController()

    const inv = openItemsCanvas('HotbarWin', {
      clickWindow (slot, mouseButton, mode) {
        if (mouseButton === 1) {
          console.log('right click')
          return
        }
        if (slot < 32 || slot > 40) return
        bot.setQuickBarSlot(slot - bot.inventory.hotbarStart)
      },
    } as any)
    const { canvasManager } = inv
    inv.inventory.supportsOffhand = bot.supportFeature('doesntHaveOffHandSlot')
    inv.pwindow.disablePicking = true

    canvasManager.children[0].disableHighlight = true
    canvasManager.minimizedWindow = true
    canvasManager.minimizedWindow = true
    if (canvasManager.scale === 1.5) canvasManager.scale = 1
    if (canvasManager.scale === 4) canvasManager.scale = 3
    window.canvasManager = canvasManager
    // canvasManager.scale = 1
    canvasManager.windowHeight = 25 * canvasManager.scale
    canvasManager.windowWidth = (210 - (inv.inventory.supportsOffhand ? 0 : 25) + (miscUiState.currentTouch ? 28 : 0)) * canvasManager.scale
    container.current.appendChild(inv.canvas)
    const upHotbarItems = () => {
      if (!viewer.world.downloadedTextureImage && !viewer.world.customTexturesDataUrl) return
      upInventoryItems(true, inv)
    }

    canvasManager.canvas.onpointerdown = (e) => {
      if (!isGameActive(true)) return
      const slot = inv.canvasManager.getMousePos(inv.canvas, e)
      // take offhand into account
      if (inv.inventory.supportsOffhand) slot.x -= 25
      const xSlot = Math.floor((slot.x - 1) / 35)
      if (xSlot === 11) {
        openPlayerInventory()
      }
    }

    bot.inventory.on('updateSlot', upHotbarItems)
    viewer.world.renderUpdateEmitter.on('textureDownloaded', upHotbarItems)

    const setSelectedSlot = (index: number) => {
      if (index === bot.quickBarSlot) return
      bot.setQuickBarSlot(index)
      if (!bot.inventory.slots?.[bot.quickBarSlot + 36]) setItemKey('')
    }
    const heldItemChanged = () => {
      inv.inventory.activeHotbarSlot = bot.quickBarSlot

      if (!bot.inventory.slots?.[bot.quickBarSlot + 36]) return
      const item = bot.inventory.slots[bot.quickBarSlot + 36]!
      const itemNbt = item.nbt ? JSON.stringify(item.nbt) : ''
      setItemKey(`${item.displayName}_split_${item.type}_split_${item.metadata}_split_${itemNbt}`)
    }
    heldItemChanged()
    bot.on('heldItemChanged' as any, heldItemChanged)

    document.addEventListener('wheel', (e) => {
      if (!isGameActive(true)) return
      e.preventDefault()
      const newSlot = ((bot.quickBarSlot + Math.sign(e.deltaY)) % 9 + 9) % 9
      setSelectedSlot(newSlot)
    }, {
      passive: false,
      signal: controller.signal
    })

    document.addEventListener('keydown', (e) => {
      if (!isGameActive(true)) return
      const numPressed = +((/Digit(\d)/.exec(e.code))?.[1] ?? -1)
      if (numPressed < 1 || numPressed > 9) return
      setSelectedSlot(numPressed - 1)
    }, {
      passive: false,
      signal: controller.signal
    })

    let touchStart = 0
    document.addEventListener('touchstart', (e) => {
      if ((e.target as HTMLElement).closest('.hotbar')) {
        touchStart = Date.now()
      } else {
        touchStart = 0
      }
    })
    document.addEventListener('touchend', (e) => {
      if (touchStart && (e.target as HTMLElement).closest('.hotbar') && Date.now() - touchStart > 700) {
        // drop item
        bot._client.write('block_dig', {
          'status': 4,
          'location': {
            'x': 0,
            'z': 0,
            'y': 0
          },
          'face': 0,
          sequence: 0
        })
      }
      touchStart = 0
    })

    return () => {
      inv.destroy()
      controller.abort()
    }
  }, [])

  return <SharedHudVars>
    <ItemName itemKey={itemKey} />
    <Portal>
      <SharedHudVars>
        <div className='hotbar' ref={container} style={{
          position: 'fixed',
          bottom: 'calc(var(--safe-area-inset-bottom) * 2)',
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          zIndex: hasModals ? 1 : 8,
        }} />
      </SharedHudVars>
    </Portal>
  </SharedHudVars>
}

const Portal = ({ children, to = document.body }) => {
  return createPortal(children, to)
}
