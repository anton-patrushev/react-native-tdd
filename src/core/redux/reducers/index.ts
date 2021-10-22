import { combineReducers } from 'redux';

import postsReducer from 'src/posts/redux/reducers/posts';

export default combineReducers({
  posts: postsReducer,
});
