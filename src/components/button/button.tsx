import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'
import classnames from 'classnames'

export enum ButtonSize {
  large = 'large',
  small = 'small'
}

export enum ButtonType {
  primary = 'primary',
  default = 'default',
  danger = 'danger',
  link = 'link'
}

interface BaseButtonProps {
  className?: string
  disabled?: boolean
  size?: ButtonSize
  btnType?: ButtonType
  children?: React.ReactNode
  href?: string
}

// type ButtonNativeType = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
// type AnchorButtonType = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>

// // Partial將所有屬性都變成可選的
// export type ButtonProp = Partial<ButtonNativeType & AnchorButtonType>
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = NativeButtonProps & AnchorButtonProps

const Button: FC<ButtonProps> = (props) => {
  const { disabled, size, btnType, children, href, className, ...restProps } = props
  const classes = classnames('btn', 'className', {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === 'link' && disabled
  })
  if (btnType === ButtonType.link) {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    )
  }
  return (
    <button className={classes} disabled={disabled} {...restProps}>
      {children}
    </button>
  )
}

Button.defaultProps = {
  disabled: false,
  btnType: ButtonType.default
}

export default Button
