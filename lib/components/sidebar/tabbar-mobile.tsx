import React from 'react'
import { Button, useTheme } from 'components'
import ToggleIcon from '../icons/toggle'

interface Props {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const TabbarMobile:React.FC<Props> = ({ onClick }) => {
  const theme = useTheme()
  const handler = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick && onClick(event)
  }

  return (
    <div className="tabbar">
      <Button className="toggle" auto type="abort" onClick={handler}>
        <ToggleIcon color={theme.palette.accents_7} />
      </Button>
      <span>ZEIT-UI React</span>
      <style jsx>{`
        .tabbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 10000;
          height: 3.7rem;
          background-color: ${theme.palette.background};
          display: flex;
          align-items: center;
          padding: 0 calc(${theme.layout.gap} * 2);
          box-sizing: border-box;
          justify-content: space-between;
          box-shadow: ${theme.expressiveness.shadowMedium};
        }
        
        .tabbar :global(.toggle) {
          width: 40px;
          height: 40px;
          padding: 0;
          display: inline-flex;
          justify-content: center;
          align-items: center;
        }
        
        span {
          color: ${theme.palette.accents_7};
          font-size: .75rem;
          display: inline-flex;
          text-transform: capitalize;
        }
        
        @media only screen and (min-width: 767px) {
          .tabbar {
            display: none;
            visibility: hidden;
            top: -1000px;
          }
        }
      `}</style>
    </div>
  )
}

export default TabbarMobile
