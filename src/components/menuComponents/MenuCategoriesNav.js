import React from 'react';
import { Link } from 'gatsby';

import BlogSearch from '../pageComponents/BlogSearch';

const MenuCategoriesNav = ({ categories, enableSearch }) => (
  <div className="MenuCategoriesNav">
    <Link className="NavLink mr-1" exact="true" to={`/menus`}>
      All
    </Link>
    {categories.map((category, index) => (
      <Link exact="true" className="NavLink mr-1" key={category.title + index} to={category.slug}>
        {category.title}
      </Link>
    ))}

    {enableSearch && <BlogSearch />}
  </div>
);

export default MenuCategoriesNav;
