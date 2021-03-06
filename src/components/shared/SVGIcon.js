import React from 'react'

export default ({ src }) => {
  const icon = {
    maskImage: `url(${src})`,
    WebkitMaskImage: `url(${src})`
  }
  return (
    <div className="SVGIcon">
      <div className="SVGIcon--icon" style={icon} />
    </div>
  )
}
