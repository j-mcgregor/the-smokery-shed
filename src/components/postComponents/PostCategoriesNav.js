import React from 'react'
import { Link } from 'gatsby'

import BlogSearch from '../pageComponents/BlogSearch'

const PostCategoriesNav = ({ categories, enableSearch }) => (
  <div className="PostCategoriesNav">
    <Link className="NavLink" exact="true" to={`/blog/`}>
      All
    </Link>
    {categories.map((category, index) => (
      <Link
        exact="true"
        className="NavLink"
        key={category.title + index}
        to={category.slug}
      >
        {category.title}
      </Link>
    ))}

    {enableSearch && <BlogSearch />}
  </div>
)

export default PostCategoriesNav
