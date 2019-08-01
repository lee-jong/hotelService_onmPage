import React from 'react';
import Cookies from 'js-cookie';

class searchHistory extends React.Component {
  constructor(props) {
    super(props);

    this.HistoryHtml = '';
  }

  componentWillReceiveProps(nextProps) {
    const { searchValue } = nextProps;
    this.searchHistoryList(searchValue);
  }

  searchHistoryList = searchValue => {
    let cookiesHistory = Cookies.getJSON('searchHistory')
      ? Cookies.getJSON('searchHistory')
      : [];

    let searcHistoryhList = cookiesHistory.filter(item => {
      return !!~item.search(searchValue);
    });

    let historyScliceByFive = searcHistoryhList.slice(0, 5);

    const { searchChange } = this.props;
    this.HistoryHtml = historyScliceByFive.map((history, index) => (
      <li
        key={index}
        onMouseDown={() => searchChange(history)}
        name="searchValue"
        value={history}
      >
        {history}
      </li>
    ));
  };

  render() {
    const { onSearchHistory } = this.props;
    return <>{onSearchHistory ? <ul>{this.HistoryHtml}</ul> : ''}</>;
  }
}

export default searchHistory;
