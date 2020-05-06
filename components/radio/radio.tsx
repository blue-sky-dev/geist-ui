import React, { useEffect, useMemo, useState } from 'react'
import useTheme from '../styles/use-theme'
import { useRadioContext } from './radio-context'
import RadioGroup from './radio-group'
import RadioDescription from './radio-description'
import { pickChild } from '../utils/collections'
import useWarning from '../utils/use-warning'

interface RadioEventTarget {
  checked: boolean
}

export interface RadioEvent {
  target: RadioEventTarget
  stopPropagation: () => void
  preventDefault: () => void
  nativeEvent: React.ChangeEvent
}

interface Props {
  checked?: boolean
  value?: string
  className?: string
  disabled?: boolean
  onChange?: (e: RadioEvent) => void
}

const defaultProps = {
  disabled: false,
  className: '',
}

type NativeAttrs = Omit<React.InputHTMLAttributes<any>, keyof Props>
export type RadioProps = Props & typeof defaultProps & NativeAttrs

const Radio: React.FC<React.PropsWithChildren<RadioProps>> = ({
  className,
  checked,
  onChange,
  disabled,
  value: radioValue,
  children,
  ...props
}) => {
  const theme = useTheme()
  const [selfChecked, setSelfChecked] = useState<boolean>(!!checked)
  const { value: groupValue, disabledAll, inGroup, updateState } = useRadioContext()
  const [withoutDescChildren, DescChildren] = pickChild(children, RadioDescription)

  if (inGroup) {
    if (checked !== undefined) {
      useWarning('Remove props "checked" if in the Radio.Group.', 'Radio')
    }
    if (radioValue === undefined) {
      useWarning('Props "value" must be deinfed if in the Radio.Group.', 'Radio')
    }
    useEffect(() => {
      setSelfChecked(groupValue === radioValue)
    }, [groupValue, radioValue])
  }

  const isDisabled = useMemo(() => disabled || disabledAll, [disabled, disabledAll])
  const changeHandler = (event: React.ChangeEvent) => {
    if (isDisabled) return
    const selfEvent: RadioEvent = {
      target: {
        checked: !selfChecked,
      },
      stopPropagation: event.stopPropagation,
      preventDefault: event.preventDefault,
      nativeEvent: event,
    }
    setSelfChecked(!selfChecked)
    if (inGroup) {
      updateState(radioValue as string)
    }
    onChange && onChange(selfEvent)
  }

  useEffect(() => {
    if (checked === undefined) return
    setSelfChecked(!!checked)
  }, [checked])

  return (
    <div className={`radio ${className}`}>
      <label>
        <input
          type="radio"
          value={radioValue}
          checked={selfChecked}
          onChange={changeHandler}
          {...props}
        />
        <span className="name">{withoutDescChildren}</span>
        {DescChildren && DescChildren}
        <span className="point" />
      </label>

      <style jsx>{`
        input {
          opacity: 0;
          visibility: hidden;
          overflow: hidden;
          width: 1px;
          height: 1px;
          top: -1000px;
          right: -1000px;
          position: fixed;
        }

        .radio {
          display: flex;
          width: initial;
          align-items: flex-start;
          line-height: 1.5rem;
          position: relative;
        }

        label {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          margin-left: 1.375rem;
          color: ${isDisabled ? theme.palette.accents_4 : theme.palette.foreground};
          cursor: ${isDisabled ? 'not-allowed' : 'pointer'};
        }

        .name {
          font-size: 1rem;
          font-weight: bold;
          user-select: none;
        }

        .point {
          position: absolute;
          left: 0;
          top: 6px;
          height: 0.875rem;
          width: 0.875rem;
          border-radius: 50%;
          border: 1px solid ${theme.palette.border};
          transition: all 0.2s ease 0s;
        }

        .point:before {
          content: '';
          position: absolute;
          left: -1px;
          top: -1px;
          height: 0.875rem;
          width: 0.875rem;
          border-radius: 50%;
          transform: scale(${selfChecked ? 1 : 0});
          transition: all 0.2s ease;
          background-color: ${isDisabled ? theme.palette.accents_4 : theme.palette.foreground};
        }
      `}</style>
    </div>
  )
}

type RadioComponent<P = {}> = React.FC<P> & {
  Group: typeof RadioGroup
  Desc: typeof RadioDescription
  Description: typeof RadioDescription
}
type ComponentProps = Partial<typeof defaultProps> &
  Omit<Props, keyof typeof defaultProps> &
  NativeAttrs

Radio.defaultProps = defaultProps

export default Radio as RadioComponent<ComponentProps>
