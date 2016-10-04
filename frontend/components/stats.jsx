const React = require('react');
const StatsApiUtil = require('../util/stats_api_util');
// var XHMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
// var xhr = new XMLHttpRequest();

const Stats = React.createClass({
  getInitialState() {
    return({ stats: [] });
  },

  _fetchStats(e) {
    e.preventDefault();
    this.setState({ stats: StatsApiUtil.getNbaStats() });
    // console.log(xhr);
  },

  // _storyChange() {
  //   this.setState({ stories: StoryStore.all() });
  // },
  //
  // componentDidMount() {
  //   this.storyListener = StoryStore.addListener(this._storyChange);
  //   StoryActions.fetchAllStories();
  // },
  //
  // componentWillUnmount() {
  //   this.storyListener.remove();
  // },

  render() {
    return (
      <div>
        <h1 onClick={this._fetchStats}>HELLO</h1>
        <ul>
          {this.state.stats.map(el => {
            return <li>{el}</li>;
          })}
        </ul>
      </div>
    );
  }
});

module.exports = Stats;
