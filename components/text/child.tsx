import React, { useMemo } from 'react'
import withDefaults from '../utils/with-defaults'
import useTheme from '../styles/use-theme'
import { NormalTypes } from '../utils/prop-types'
import { ZeitUIThemesPalette } from '../styles/themes'

export interface Props {
  tag: keyof JSX.IntrinsicElements
  type?: NormalTypes
  className?: ''
}

const defaultProps = {
  type: 'default' as NormalTypes,
  className: '',
}

const getTypeColor = (type: NormalTypes, palette: ZeitUIThemesPalette) => {
  const colors: { [key in NormalTypes]: string} = {
    default: 'inherit',
    secondary: palette.secondary,
    success: palette.success,
    warning: palette.warning,
    error: palette.error,
  }
  
  return colors[type] || colors.default
}

type NativeAttrs = Omit<React.DetailsHTMLAttributes<any>, keyof Props>
export type TextChildProps = Props & typeof defaultProps & NativeAttrs

const TextChild: React.FC<React.PropsWithChildren<TextChildProps>> = React.memo(({
  children, tag, className, type, ...props
}) => {
  const theme = useTheme()
  const Component = tag
  const color = useMemo(
    () => getTypeColor(type, theme.palette),
    [type, theme.palette],
  )
  return (
    <>
      <Component className={className} {...props}>{children}</Component>
      <style jsx>{`
        ${tag} {
          color: ${color};
        }
      `}</style>
    </>
  )
})

export default withDefaults(TextChild, defaultProps)

