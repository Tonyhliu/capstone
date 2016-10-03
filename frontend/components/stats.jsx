const React = require('react');
const StatsApiUtil = require('../util/stats_api_util');

const Stats = React.createClass({
  getInitialState() {
    return({ stats: {} });
  },

  _fetchStats(e) {
    e.preventDefault();
    StatsApiUtil.getNbaStats();
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
      </div>
    );
  }
});

module.exports = Stats;
