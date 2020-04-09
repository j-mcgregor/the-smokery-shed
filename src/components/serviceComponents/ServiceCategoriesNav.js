import React from 'react';
import { Link } from 'gatsby';

import BlogSearch from '../pageComponents/BlogSearch';

const ServiceCategoriesNav = ({ categories, enableSearch }) => (
  <div className="ServiceCategoriesNav">
    <Link className="NavLink mr-1" exact="true" to={`/services`}>
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

export default ServiceCategoriesNav;
