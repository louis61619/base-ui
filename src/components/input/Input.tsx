import React, { ReactElement, InputHTMLAttributes, ChangeEvent } from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import Icon from '../icon/Icon'
import classNames from 'classnames'

type InputSize = 'large' | 'small'

// Omit禁用繼承某個屬性
export interface IInputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  disabled?: boolean
  size?: InputSize
  icon?: IconProp
  prepend?: string | ReactElement
  append?: string | ReactElement
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<IInputProps> = (props) => {
  const { disabled, size, icon, style, prepend, append, children, ...resetProps } = props
  const classes = classNames('base-input-wrapper', {
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-append': !!append,
    'input-group-prepend': !!prepend
  })

  // 將props的默認值轉為空字串
  const fixControlledValue = (value: any) => {
    if (typeof value === 'undefined' || value === null) {
      return ''
    }
    return value
  }
  if ('value' in props) {
    delete resetProps.defaultValue
    resetProps.value = fixControlledValue(props.value)
  }

  return (
    <div className={classes} style={style}>
      {prepend && <div className="base-input-group-prepend">{prepend}</div>}
      {icon && (
        <div className="icon-wrapper">
          <Icon icon={icon}></Icon>
        </div>
      )}
      <input className="base-input-inner" disabled={disabled} {...resetProps} />
      {append && <div className="base-input-group-append">{append}</div>}
    </div>
  )
}

export default Input
