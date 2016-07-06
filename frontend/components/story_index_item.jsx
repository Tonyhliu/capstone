const React = require('react');
const Link = require('react-router').Link;
const StoryActions = require('../actions/story_actions');
const FavoriteActions = require('../actions/favorite_actions');
const StoryStore = require('../stores/story_store');
const SessionStore = require('../stores/session_store');
const hashHistory = require('react-router').hashHistory;

const Button = require('react-materialize').Button;
const Icon = require('react-materialize').Icon;

const StoryIndexItem = React.createClass({
  editPost(e) {
    e.preventDefault();
    hashHistory.push(`/stories/${this.props.story.id}/edit`);
  },

  deletePost(e) {
    e.preventDefault();
    StoryActions.deleteStory(`${this.props.story.id}`);
  },

  _isLiked() {
    let likeText = "LIKE";
    const currentUser = SessionStore.currentUser();

    if (SessionStore.isUserLoggedIn()) {
      const currentUserFavs = currentUser.favorite_stories;

      if (currentUserFavs.indexOf(this.props.story.id) !== -1) {
        likeText = "UNLIKE";
      }
    }

    return likeText;
  },

  toggleFav() {
    const data = { story_id: this.props.story.id };

    if (this._isLiked() === "LIKE") {
      FavoriteActions.createFavorite(data);
    } else {
      FavoriteActions.deleteFavorite(data);
    }
  },

  cropPic(url) {
    let base = "http://res.cloudinary.com/dcbb8bnvk/image/upload/c_fill,h_300,w_1600/";
    let cropUrl = url.split('/');
    return base + cropUrl[cropUrl.length - 1];
  },

  render() {
    const username = this.props.story.user.username.toUpperCase();
    const picUrl = this.cropPic(this.props.story.picture_url);
    return(
      <li className="story-index-item">
        <div className="image-container">
          <img className="story-pics"
            src={picUrl} />
        </div>
          <h4 className="story-user">{username}</h4>
          Number of Likes: {this.props.story.favorite_users.length }
          <br/>
          <img src="http://res.cloudinary.com/dcbb8bnvk/image/upload/c_scale,h_40,w_45/v1467831610/thumbsup_zhunmy.jpg"
                className="toggle-fave"
                onClick={this.toggleFav} />
          <h2 className="story-links">
            <Link to={`/stories/${this.props.story.id}`}>
              {this.props.story.title}
            </Link>

          </h2>
          <p className={"paragraphs"}>
            {this.props.story.body.slice(0, 300) + "..."}
          </p>
      </li>
    );
  }
});

module.exports = StoryIndexItem;
