import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'
import classnames from 'classnames'

export type ButtonSize = 'large' | 'small'
export type ButtonType = 'primary' | 'default' | 'danger' | 'link'

export interface IButtonProps {
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
type NativeButtonProps = IButtonProps & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = IButtonProps & AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = NativeButtonProps & AnchorButtonProps

const Button: FC<ButtonProps> = (props: ButtonProps) => {
  const { disabled, size, btnType, children, href, className, ...restProps } = props

  const classes = classnames('btn', 'className', {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === 'link' && disabled
  })

  if (btnType === 'link') {
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
  btnType: 'default'
}

export default Button
