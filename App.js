import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Nav from './components/Nav.js'

export default function App() {
    return (
        <NavigationContainer>
            <Nav />
        </NavigationContainer>
    );
}

