import React from 'react'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'

export type ThemeProps = 'primary' | 'success' | 'error' | 'info' | 'danger' | 'secondary'

interface IIconProps extends FontAwesomeIconProps {
  theme?: ThemeProps
}

const Icon: React.FC<IIconProps> = (props) => {
  const { className, theme, ...resetProps } = props
  const classes = classNames('base-icon', className, {
    [`icon-${theme}`]: theme
  })
  return <FontAwesomeIcon className={classes} {...resetProps} />
}

export default Icon
