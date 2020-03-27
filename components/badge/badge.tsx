import React, { useMemo } from 'react'
import withDefaults from '../utils/with-defaults'
import useTheme from '../styles/use-theme'
import { NormalSizes, NormalTypes } from '../utils/prop-types'
import { ZeitUIThemesPalette } from 'components/styles/themes'

interface Props {
  type?: NormalTypes
  size?: NormalSizes
  className?: string
}

const defaultProps = {
  type: 'default' as NormalTypes,
  size: 'medium' as NormalSizes,
  className: '',
}

export type BadgeProps = Props & typeof defaultProps & React.HTMLAttributes<any>

const getFontSize = (size: NormalSizes) => {
  const sizes: { [key in NormalSizes]: string } = {
    mini: '.7rem',
    small: '.75rem',
    medium: '.875rem',
    large: '1rem',
  }
  return sizes[size]
}

const getBgColor = (type: NormalTypes, palette: ZeitUIThemesPalette) => {
  const colors: { [key in NormalTypes]: string } = {
    default: palette.foreground,
    success: palette.success,
    warning: palette.warning,
    error: palette.error,
    secondary: palette.secondary,
  }
  return colors[type]
}

const Badge: React.FC<React.PropsWithChildren<BadgeProps>> = React.memo(({
  type, size, className, children, ...props
}) => {
  const theme = useTheme()
  const bg = useMemo(() => getBgColor(type, theme.palette), [type, theme.palette])
  const font = useMemo(() => getFontSize(size), [size])
  
  return (
    <span className={className} {...props}>
      {children}
      <style jsx>{`
        span {
          display: inline-block;
          padding: 4px 7px;
          border-radius: 16px;
          font-variant: tabular-nums;
          line-height: 1;
          vertical-align: middle;
          background-color: ${bg};
          color: white;
          font-size: ${font};
          border: 0;
        }
      `}</style>
    </span>
  )
})

export default withDefaults(Badge, defaultProps)
