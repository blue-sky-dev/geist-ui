import React from 'react'
import withDefaults from '../utils/with-defaults'

interface Props {
  span?: number
  offset?: number
  component?: keyof JSX.IntrinsicElements
  className?: string
}

const defaultProps = {
  span: 24,
  offset: 0,
  component: 'div' as 'div',
  className: '',
}

export type ColProps = Props & typeof defaultProps & React.HTMLAttributes<any>

const Col: React.FC<React.PropsWithChildren<ColProps>> = React.memo(({
  component, children, span, offset, className, ...props
}) => {
  const Component = component
  
  return (
    <Component className={`col ${className}`} {...props}>
      {children}
      <style jsx>{`
        .col {
          float: left;
          box-sizing: border-box;
          padding-left: calc(var(--row-gap) / 2);
          padding-right: calc(var(--row-gap) / 2);
          width: ${100 / 24 * span}%;
          margin-left: ${100 / 24 * offset}%;
        }
      `}</style>
    </Component>
  )
})

export default withDefaults(Col, defaultProps)
