import { useEffect, useState, useContext } from 'react'
import { customCommandsConfig } from '../customCommands'
import { ButtonWithMatchesAlert, Context } from './KeybindingsScreen'
import Button from './Button'
import styles from './KeybindingsScreen.module.css'
import Input from './Input'

export type CustomCommand = {
  keys: undefined | string[]
  gamepad: undefined | string[]
  type: string
  inputs: any[]
}

export type CustomCommandsMap = Record<string, CustomCommand>

export default (
  {
    customCommands,
    setActionName,
    setGroupName,
    resetBinding,
    updateCustomCommands
  }: {
    customCommands: CustomCommandsMap,
    setGroupName: (state: string) => void,
    setActionName: (state: string) => void,
    updateCustomCommands: (newValue: CustomCommandsMap) => void
    resetBinding: (group, action, inputType) => void,
  }
) => {
  const { userConfig } = useContext(Context)
  const [customConfig, setCustomConfig] = useState({ ...customCommands })

  useEffect(() => {
    updateCustomCommands(customConfig)
    console.log('constom config updated')
  }, [customConfig])

  const addNewCommand = (type) => {
    // max key + 1
    const newKey = String(Math.max(...Object.keys(customCommands).map(Number).filter(key => !isNaN(key)), 0) + 1)
    customCommands[newKey] = {
      keys: [],
      gamepad: [],
      type,
      inputs: []
    }
    setCustomConfig(prev => {
      const newCustomConf = { ...prev }
      newCustomConf[newKey] = {
        keys: undefined as string[] | undefined,
        gamepad: undefined as string[] | undefined,
        type,
        inputs: [] as any[]
      }
      return newCustomConf
    })
  }


  return <>
    <div className={styles.group}>
      {Object.entries(customCommandsConfig).map(([group, { input }]) => (
        <div className={styles.group}><div key={group} className={styles['group-category']}>{group}</div>
          {Object.entries(customConfig).filter(([key, data]) => data.type === group).map((commandData, indexOption) => {
            return <CustomCommandContainer
              indexOption={indexOption}
              commandData={commandData}
              setActionName={setActionName}
              setGroupName={setGroupName}
              resetBinding={resetBinding}
              groupData={[group, { input }]}
              setCustomConfig={setCustomConfig}
              customConfig={customConfig}
            />
          })}
          <Button
            onClick={() => addNewCommand(group)}
            icon={'pixelarticons:add-box'}
            style={{
              alignSelf: 'center'
            }}
          />
        </div>
      ))}
    </div>
  </>
}

const CustomCommandContainer = (
  {
    indexOption,
    commandData,
    setActionName,
    setGroupName,
    resetBinding,
    setCustomConfig,
    customConfig,
    groupData
  }
) => {
  const { userConfig } = useContext(Context)

  const [commandKey, { keys, gamepad, inputs }] = commandData
  const [group, { input }] = groupData

  const setInputValue = (optionKey, indexInput, value) => {
    // setCustomConfig(prev => { return { ...userConfig.custom as any } })
    setCustomConfig(prev => {
      const newConfig = { ...prev }
      newConfig[optionKey].inputs = [...prev[optionKey].inputs]
      newConfig[optionKey].inputs[indexInput] = value
      return newConfig
    })
  }

  return <div style={{ padding: '10px' }} key={indexOption}>
    {input.map((obj, indexInput) => {
      const config = typeof obj === 'function' ? obj(inputs) : obj
      if (!config) return null

      return config.type === 'select'
        ? <select key={indexInput} onChange={(e) => {
          setInputValue(commandKey, indexInput, e.target.value)
        }}>{config.options.map((option) => <option key={option} value={option}>{option}</option>)}</select>
        : <Input key={indexInput} rootStyles={{ width: '99%' }} placeholder={config.placeholder} value={inputs[indexInput]} onChange={(e) => setInputValue(commandKey, indexInput, e.target.value)} />
    })}
    <div className={styles.actionBinds}>
      {
        userConfig?.['custom']?.[commandKey]?.keys ? <Button
          onClick={() => {
            setActionName(commandKey)
            setGroupName(group)
            // resetBinding('custom', commandKey, 'keyboard')
            setCustomConfig(prev => {
              const newConfig = { ...prev }
              newConfig[commandKey]['keys'] = undefined
              return newConfig
            })
          }}
          className={styles['undo-keyboard']}
          style={{ position: 'relative', left: '0px' }}
          icon={'pixelarticons:undo'}
        />
          : null}

      {[0, 1].map((key, index) => <ButtonWithMatchesAlert
        key={`custom-keyboard-${group}-${commandKey}-${index}`}
        group={'custom'}
        action={commandKey}
        index={index}
        inputType={'keyboard'}
        keys={keys}
        gamepadButtons={gamepad}
      />
      )}

      {
        userConfig?.['custom']?.[commandKey]?.gamepad ? <Button
          onClick={() => {
            setActionName(commandKey)
            setGroupName(group)
            resetBinding('custom', commandKey, 'gamepad')
            setCustomConfig(prev => {
              const newConfig = { ...prev }
              newConfig[commandKey]['gamepad'] = undefined
              return newConfig
            })
          }}
          className={styles['undo-keyboard']}
          style={{ left: '44px' }}
          icon={'pixelarticons:undo'}
        />
          : null}
      <ButtonWithMatchesAlert
        key={`custom-gamepad-${group}-${commandKey}-0`}
        group={'custom'}
        action={commandKey}
        index={0}
        inputType={'gamepad'}
        keys={keys}
        gamepadButtons={gamepad}
      />
      <Button
        onClick={() => {
          // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
          delete userConfig!.custom[commandKey]
          setCustomConfig(prev => {
            const newConfig = { ...prev }
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
            delete newConfig[commandKey]
            return newConfig
          })
        }}

        style={{ color: 'red' }}
        icon={'pixelarticons:delete'}
      />
    </div>
  </div>
}