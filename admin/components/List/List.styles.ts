import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    marginTop: 0,
    marginRight: 'auto',
    marginBottom: 0,
    marginLeft: 'auto'
  },
  search: {
    borderWidth: 1,
    borderColor: "darkgrey",
    paddingTop: 10,
    paddingRight: 5,
    paddingBottom: 10,
    paddingLeft: 5,
    marginTop: 10
  },
  headline: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  list: {
    marginTop: 20,
    color: "black"
  },
  separator: {
    height: 1,
    borderTopWidth: 1,
    borderTopColor: 'darkgrey',
  },
  listItem: {
    marginHorizontal: 10,
    marginVertical: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

export default styles;
