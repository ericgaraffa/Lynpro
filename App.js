import React, {Component, useState} from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Nav from './components/Nav';
import Home from './components/Home';

export default function App() {
  return (
    <NavigationContainer>
      <Nav />
    </NavigationContainer>
  );
}
