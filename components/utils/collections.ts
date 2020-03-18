import React, { ReactNode } from 'react'

export const hasChild = (
  children: ReactNode | undefined,
  child: React.ElementType
): Boolean => {
  const types = React.Children.map(children, item => {
    if (!React.isValidElement(item)) return null
    return item.type
  })
  
  return (types || []).includes(child)
}

export const pickChild = (
  children: ReactNode | undefined,
  targetChild: React.ElementType
): [ReactNode | undefined, ReactNode | undefined] => {
  let target: ReactNode[] = []
  const withoutTargetChildren = React.Children.map(children, item => {
    if (!React.isValidElement(item)) return null
    if (item.type === targetChild) {
      target.push(item)
      return null
    }
    return item
  })
  
  const targetChildren = target.length >= 0 ? target : undefined
  
  return [withoutTargetChildren, targetChildren]
}

export const pickChildByProps = (
  children: ReactNode | undefined,
  key: string,
  value: any,
): [ReactNode | undefined, ReactNode | undefined] => {
  let target: ReactNode[] = []
  const withoutPropChildren = React.Children.map(children, item => {
    if (!React.isValidElement(item)) return null
    if (!item.props) return item
    if (item.props[key] === value) {
      target.push(item)
      return null
    }
    return item
  })
  
  const targetChildren = target.length >= 0 ? target : undefined
  
  return [withoutPropChildren, targetChildren]
}
