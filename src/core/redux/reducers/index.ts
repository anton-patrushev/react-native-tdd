import { combineReducers } from 'redux';

import postsReducer from 'src/domains/posts/redux/reducers/posts';

export default combineReducers({
  posts: postsReducer,
});
