import { useState, useEffect } from 'react'
import { Transition } from 'react-transition-group'
import MessageFormattedString from './MessageFormattedString'
import './Title.css'

export type AnimationTimes = {
  fadeIn: number,
  stay: number,
  fadeOut: number
}

type TitleProps = {
  title: string | Record<string, any>,
  subtitle: string | Record<string, any>,
  actionBar: string | Record<string, any>,
  transitionTimes: AnimationTimes,
  open: boolean
}

const Title = (
  {
    title,
    subtitle,
    actionBar,
    transitionTimes,
    open = false
  }: TitleProps
) => {
  const [mounted, setMounted] = useState(false)
  const [useEnterTransition, setUseEnterTransition] = useState(true)
  const [isOpen, setIsOpen] = useState(open)

  const defaultDuration = 500
  const startStyle = {
    opacity: 1,
    transition: `${transitionTimes.fadeIn}ms ease-in-out all` }
  const endExitStyle = {
    opacity: 0,
    transition: `${transitionTimes.fadeOut}ms ease-in-out all` }

  const stateStyles = {
    entering: startStyle,
    entered: { opacity: 1 },
    exiting: endExitStyle,
    exited: { opacity: 0 },
  }

  useEffect(() => {
    if (!mounted && open) {
      setMounted(true)
    }
  }, [open])

  return (
    <div className='message-container'>
      <Transition
        in={open}
        timeout={transitionTimes ? {
          enter: transitionTimes.fadeIn,
          exit: transitionTimes.fadeOut,
        } : defaultDuration}
        mountOnEnter
        unmountOnExit
        enter={useEnterTransition}
        onExiting={() => {
          setUseEnterTransition(prev => false)
        }}
        onExited={() => {
          setUseEnterTransition(prev => true)
        }}
      >
        {(state) => {
          return (
            <div style={{ ...stateStyles[state] }}>
              <div className='titleScreen'>
                <h1 className='message-title'>
                  <MessageFormattedString message={title} />
                </h1>
                <h4 className='message-subtitle'>
                  <MessageFormattedString message={subtitle} />
                </h4>
              </div>
              <div className='actionScreen'>
                <div className='action-bar'>
                  <MessageFormattedString message={actionBar} />
                </div>
              </div>
            </div>
          )}}
      </Transition>
    </div>

  )
}

export default Title
