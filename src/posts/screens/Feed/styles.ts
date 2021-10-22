import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  header: {
    flex: 1,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: { color: '#FFF', fontSize: 20 },
  content: { flex: 1 },
  bottom: {
    flex: 1,
    height: 80,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
