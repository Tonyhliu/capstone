// React
const React = require('react');
const ReactDOM = require('react-dom');

//Router
const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const IndexRoute = ReactRouter.IndexRoute;
const hashHistory = ReactRouter.hashHistory;

// Modal
const Modal = require('react-modal');

//Components
const App = require('./components/app');
const SessionActions = require('./actions/session_actions');
const SessionStore = require('./stores/session_store');
const Splash = require('./components/splash');
const SessionApiUtil = require('./util/session_api_util');
const StoryIndex = require('./components/story_index');
const StoryShow = require('./components/story_show');
const StoryForm = require('./components/story_form');
const CommentForm = require('./components/comment_form');

//Auth
// const SessionStore = require('./stores/session_store');
// const SessionActions = require('./actions/session_actions');

const appRouter = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Splash} onEnter={_redirectIfLoggedIn} />
      <Route path="stories" component={StoryIndex} />
      <Route path="stories/new" component={StoryForm} />
      <Route path="stories/:storyid/edit" component={StoryForm} />
      <Route path="stories/:storyid" component={StoryShow}>
        <Route path="comment" component={CommentForm} />
      </Route>
    </Route>
  </Router>
);

function _redirectIfLoggedIn(nextState, replace) {
  if (SessionStore.isUserLoggedIn()) {
    replace("/stories");
  }
}

document.addEventListener('DOMContentLoaded', function () {
  if (window.currentUser) {
    SessionActions.receiveCurrentUser(window.currentUser);
  }

  Modal.setAppElement(document.body);

  ReactDOM.render(
    appRouter,
      document.getElementById('root')
  );
});
