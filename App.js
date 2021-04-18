import React, { useEffect, useState } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  TextInput,
  Button,
} from 'react-native';

const App = () => {
  const [location, setLocation] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [text, setText] = React.useState('Ivano-Frankivsk');
  const [searchCity, setSearchCity] = React.useState('Ivano-Frankivsk');

  const fetchedData = () => {
    const BASE_URL =
      `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=metric&appid=43c9175c9adbcdb037c705901f217e00`;

    return fetch(BASE_URL)
      .then(response => response.json())
      .then(json => setLocation(json))
  }

  useEffect(() => {
    fetchedData()
  }, [searchCity])

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchedData()
      .then(() => setRefreshing(false));
  }, [searchCity]);

  const iconUrl = `https://openweathermap.org/img/w/${location.weather && location.weather[0].icon}.png`;
  const backgroundImage = {uri: 'https://i.pinimg.com/originals/b8/4f/ad/b84fadd0e1d07f7748a3a8c0e97ecc9f.jpg'};

  const { name, sys, main, wind } = location;

  return (
    <ImageBackground source={backgroundImage} style={{width: '100%', height: '100%'}}>
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >
          {name && (
            <View style={{marginTop: 20}}>
              <Text style={styles.refresh_text}>Pull down to refresh</Text>
            </View>
          )}

          {!name && (
            <Text style={{fontSize: 25, color: 'grey', fontWeight: 'bold'}}>No searched city. Try another.</Text>
          )}

          <View style={{marginTop: 50}}>
            <TextInput
              style={{fontSize: 25, marginTop: 0}}
              placeholder="Type here to search city"
              onChangeText={text => setText(text)}
            />
          </View>
          <View style={{marginTop: 20}}>
            <Button color="black" title='SEARCH' onPress={() => setSearchCity(text)} />
          </View>

          {name && (
            <View>
              <View style={styles.weather_icon_container}>
                <Image style={styles.weather_icon} source={{uri: iconUrl}} />
              </View>

              <View style={styles.mainContainer}>
                <Text style={styles.location}>
                  {`${name && name}, ${sys && sys.country}`}
                </Text>

                <Text style={styles.main_temperature}>
                  {main && main.temp}&deg;
                </Text>

                <View style={styles.details_container}>
                  <Text style={styles.details}>
                    Feels like: {main && main.feels_like}&deg;
                  </Text>

                  <Text style={styles.details}>
                    Humidity: {main && main.humidity} %
                  </Text>

                  <Text style={styles.details}>
                    Wind speed: {wind && wind.speed} m/s
                  </Text>

                  <Text style={styles.details}>
                    Pressure: {main && main.pressure} hPa
                  </Text>
                </View>
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  weather_icon_container: {
    alignItems: 'center',
  },
  weather_icon: {
    height: 150,
    width: 150,
  },
  reload_image: {
    height: 50,
    width: 50,
  },
  location: {
    fontSize: 30,
    textAlign: 'center'
  },
  main_temperature: {
    fontSize: 50,
    textAlign: 'center',
    marginTop: 30,
  },
  details_container: {
    margin: 20,
  },
  details: {
    width: 260,
    fontSize: 20,
    textAlign: 'center',
    margin: 5,
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
  },
  scrollView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  refresh_text: {
    fontSize: 15,
  }
})

export default App;
