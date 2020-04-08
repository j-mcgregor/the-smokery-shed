import React from 'react';

import MenuCard from './MenuCard';

class MenuSection extends React.Component {
  static defaultProps = {
    menus: [],
    title: '',
    limit: 12,
    showLoadMore: true,
    loadMoreTitle: 'Load More',
    perPageLimit: 12
  };

  state = {
    limit: this.props.limit
  };

  increaseLimit = () =>
    this.setState(prevState => ({
      limit: prevState.limit + this.props.perPageLimit
    }));

  render() {
    const { menus, title, showLoadMore, loadMoreTitle } = this.props,
      { limit } = this.state,
      visibleMenus = menus.slice(0, limit || menus.length);

    return (
      <div className="PostSection">
        {title && <h2 className="PostSection--Title">{title}</h2>}
        {!!visibleMenus.length && (
          <div className="PostSection--Grid">
            {visibleMenus.map((menu, index) => (
              <MenuCard key={menu.title + index} {...menu} />
            ))}
          </div>
        )}
        {showLoadMore && visibleMenus.length < menus.length && (
          <div className="taCenter">
            <button className="button" onClick={this.increaseLimit}>
              {loadMoreTitle}
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default MenuSection;
