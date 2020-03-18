import React from 'react'
import withDefaults from '../utils/with-defaults'

interface Props {
  className?: string
}

const defaultProps = {
  className: ''
}

export type FieldsetTitleProps = Props & typeof defaultProps & React.HTMLAttributes<HTMLHeadingElement>

const FieldsetTitle: React.FC<FieldsetTitleProps> = React.memo(({
  className, children, ...props
}) => {
  return (
    <>
      <h4 className={className} {...props}>{children}</h4>
      <style jsx>{`
        h4 {
          font-size: 1.25rem;
          line-height: 1.5;
          margin: 0;
          display: inline-flex;
          word-break: break-word;
        }
      `}</style>
    </>
  )
})

export default withDefaults(FieldsetTitle, defaultProps)
