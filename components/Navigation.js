import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Personnaliser from './Personnaliser';
import Game from './Game';

const AppNavigator = createStackNavigator({
  Personnaliser: {
    screen: Personnaliser,
    navigationOptions: {
      title: 'Personnaliser'
    },
  },
  Game: {
    screen: Game,
    navigationOptions: {
      title: 'Game'
    },
  },
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;