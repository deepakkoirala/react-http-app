import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class FetchDemo extends React.Component {
  static propTypes = {
    subreddit: PropTypes.string.isRequired
  }

  // Set up the default state with a property intitializer
  // instead of writing a whole constructor just for this
  // You can reference 'this.props' here if you need to.
  state = {
    posts: [],
    loading: true,
    error: null
  }

  componentDidMount() {
    // Remove the 'www.' to cause a CORS error (and see the error state)
    axios.get(`http://www.reddit.com/r/${this.props.subreddit}.json`)
      .then(res => {
        // Transform the raw data by extracting the nested posts
        const posts = res.data.data.children.map(obj => obj.data);

        // Update state to trigger a re-render.
        // Clear any errors, and turn off the loading indiciator.
        this.setState({
          posts,
          loading: false,
          error: null
        });
      })
      .catch(err => {
        // Something went wrong. Save the error in state and re-render.
        this.setState({
          loading: false,
          error: err
        });
      });
  }

  renderLoading() {
    return <div>Loading...</div>;
  }

  renderError() {
    return (
      <div>
        Something went wrong: {this.state.error.message}
      </div>
    );
  }

  renderPosts() {
    // Using destructuring to extract the 'error' and 'posts'
    // keys from state. This saves having to write "this.state.X" everwhere.
    const { error, posts } = this.state;

    if(error) {
      return this.renderError();
    }

    return (
      <ul>
        {posts.map(post =>
          <li key={post.id}>
            <span className="score">{post.score}</span>
            {post.title}
          </li>
        )}
      </ul>
    );
  }

  render() {
    const { subreddit } = this.props;
    const { loading } = this.state;

    return (
      <div>
        <h1>{`/r/${subreddit}`}</h1>
        {loading ? this.renderLoading() : this.renderPosts()}
      </div>
    );
  }
}


export default FetchDemo;
