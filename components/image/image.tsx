import React, { useEffect, useRef, useState } from 'react'
import withDefaults from '../utils/with-defaults'
import useTheme from '../styles/use-theme'
import ImageSkeleton from './image.skeleton'

interface Props {
  src: string
  animation: boolean
  width?: number
  height?: number
  className?: string
  scale?: string
}

const defaultProps = {
  animation: true,
  className: '',
  scale: '100%',
}

type NativeAttrs = Omit<React.ImgHTMLAttributes<any>, keyof Props>
export type ImageProps = Props & typeof defaultProps & NativeAttrs

const Image: React.FC<ImageProps> = React.memo(({
  src, width, height, animation, className, scale, ...props
}) => {
  const showAnimation = animation && width && height
  const theme = useTheme()
  const [loading, setLoading] = useState<boolean>(true)
  const [showSkeleton, setShowSkeleton] = useState<boolean>(true)
  const imageRef = useRef<HTMLImageElement>(null)
  const w = width ? `${width}px` : 'auto'
  const h = height ? `${height}px` : 'auto'
  const imageLoaded = () => {
    if (!showAnimation) return
    setLoading(false)
  }
  
  useEffect(() => {
    if (!showAnimation) return
    if (!imageRef.current) return
    if (imageRef.current.complete) {
      setLoading(false)
      setShowSkeleton(false)
    }
  })
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (showAnimation) {
        setShowSkeleton(false)
      }
      clearTimeout(timer)
    }, 300)
    return () => clearTimeout(timer)
  }, [loading])
  
  return (
    <div className={`image ${className}`}>
      {(showSkeleton && showAnimation) && <ImageSkeleton opacity={loading ? .5 : 0} />}
      <img ref={imageRef} width={width} height={height} onLoad={imageLoaded} src={src} {...props} />
      <style jsx>{`
        .image {
          width: ${w};
          height: ${h};
          margin: 0 auto;
          position: relative;
          border-radius: ${theme.layout.radius};
          overflow: hidden;
          max-width: 100%;
        }
        
        img {
          width: ${scale};
          height: ${scale};
          object-fit: scale-down;
        }
      `}</style>
    </div>
  )
})

export default withDefaults(Image, defaultProps)
