import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ListView,
  ActivityIndicator } from 'react-native';


  const URL = 'https://www.thecocktaildb.com/api/json/v2/9973533/recent.php';

  export default class Recipe extends React.Component {
    constructor(props) {
      super(props);
    this.state = {
      isLoading: true
    }
    }
  componentDidMount() {
    return fetch(URL)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          meals: responseJson.meals
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator 
            color = '#bc2b78'
            size = 'large'
            style = {styles.activityIndicator}
          />
        </View>
      );
    }

    return (
      <View style={{flex: 1, paddingTop:20}}>
        <FlatList
          data={this.state.meals}
          renderItem={({item}) => <Text>{item.strMeal}, {item.strArea}</Text>}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
  }

  const styles = StyleSheet.create({
    activityIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 80
    },
  });