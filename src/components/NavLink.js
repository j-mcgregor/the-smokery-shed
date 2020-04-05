import React from 'react'
import { Link } from 'gatsby'

export default ({ className, children, ...props }) => (
  <Link {...props} className={`NavLink ${className || ''}`}>
    {children}
  </Link>
)
