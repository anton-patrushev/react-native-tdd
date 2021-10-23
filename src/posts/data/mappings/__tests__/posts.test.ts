// yarn jest src/posts/data/mappings/__tests__/posts.test.ts --coverage

import { mapPostsFromNetwork } from '../posts';

import { Post } from 'src/posts/data/types/post';

describe('posts mappings', () => {
  it('should return []', () => {
    const incomingNetworkPosts: Array<any> = [];

    const expectedMappedPosts: Array<Post> = [];
    const actualMappedPosts = mapPostsFromNetwork(incomingNetworkPosts);

    expect(actualMappedPosts).toStrictEqual(expectedMappedPosts);
  });

  it('should return successfully mapped posts when the same structured posts received', () => {
    const incomingNetworkPosts: Array<any> = [
      { id: 0, title: 'title', body: 'some body' },
      { id: 43, title: 'sg -sf sdf', body: 'some body 222' },
      { id: 14532, title: 'title 1231', body: 'some body s' },
    ];

    const expectedMappedPosts: Array<Post> = [
      { id: 0, title: 'title', body: 'some body' },
      { id: 43, title: 'sg -sf sdf', body: 'some body 222' },
      { id: 14532, title: 'title 1231', body: 'some body s' },
    ];
    const actualMappedPosts = mapPostsFromNetwork(incomingNetworkPosts);

    expect(actualMappedPosts).toStrictEqual(expectedMappedPosts);
  });

  it("should return successfully mapped posts and map string ids to numbers if it's possible", () => {
    const incomingNetworkPosts: Array<any> = [
      { id: '0', title: 'title', body: 'some body' },
      { id: '0-1', title: 'should be ignored', body: 'should be ignored body' }, // id couldn't be mapped into number
      { id: '43', title: 'sg -sf sdf2', body: 'some body 222' },
      { id: '14532', title: 't22tle 1231', body: 'some body s' },
    ];

    const expectedMappedPosts: Array<Post> = [
      { id: 0, title: 'title', body: 'some body' },
      { id: 43, title: 'sg -sf sdf2', body: 'some body 222' },
      { id: 14532, title: 't22tle 1231', body: 'some body s' },
    ];
    const actualMappedPosts = mapPostsFromNetwork(incomingNetworkPosts);

    expect(actualMappedPosts).toStrictEqual(expectedMappedPosts);
  });

  it('should return [] since mapping failed', () => {
    const incomingNetworkPosts: Array<any> = [
      { id: '0', title: 'title', body: null },
      null,
      false,
      0,
      { id: '0-1', title: 'should be ignored', body: 'should be ignored body' }, // id couldn't be mapped into number
      { id: '43', title: { someKey: 'someValue' }, body: 'some body 222' },
      'randomString',
    ];

    const expectedMappedPosts: Array<Post> = [];
    const actualMappedPosts = mapPostsFromNetwork(incomingNetworkPosts);

    expect(actualMappedPosts).toStrictEqual(expectedMappedPosts);
  });

  it('should return successfully mapped posts and ignored useless props', () => {
    const incomingNetworkPosts: Array<any> = [
      { id: null, title: 'null-id', body: '_null-id' },
      { id: '0', title: 'title', body: 'body', randomKey: { a: '123', b: 23 } },
      { id: '43', title: 'someValue', body: 'some body 222', _body: 'body: 2' },
      { id: '14532', title: 't', body: '2s', someKey: '123', a: 'cbd', d: 'C' },
      { id: '22', title: 't221231', someKey: '123', a: 'cbd', d: 'C' },
    ];

    const expectedMappedPosts: Array<Post> = [
      { id: 0, title: 'title', body: 'body' },
      { id: 43, title: 'someValue', body: 'some body 222' },
      { id: 14532, title: 't', body: '2s' },
    ];
    const actualMappedPosts = mapPostsFromNetwork(incomingNetworkPosts);

    expect(actualMappedPosts).toStrictEqual(expectedMappedPosts);
  });
});
