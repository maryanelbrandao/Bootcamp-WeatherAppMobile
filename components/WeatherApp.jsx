import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard, Alert } from "react-native";
import axios from "axios";
import { REACT_NATIVE_WEATHER_API_KEY } from "@env";

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [unit, setUnit] = useState("metric");

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${REACT_NATIVE_WEATHER_API_KEY}`
      );
      setWeatherData(response.data);
      Keyboard.dismiss();
    } catch (err) {
      setWeatherData(null);
      Alert.alert("Error", "Could not fetch weather data. Please check the city name.");
    }
  };

  const toggleUnit = () => {
    setUnit(prev => (prev === "metric" ? "imperial" : "metric"));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather Forecast App</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter city"
        value={city}
        onChangeText={setCity}
      />
      <TouchableOpacity style={styles.button} onPress={fetchWeather}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.toggleButton} onPress={toggleUnit}>
        <Text style={styles.toggleButtonText}>
          Toggle to {unit === "metric" ? "Fahrenheit" : "Celsius"}
        </Text>
      </TouchableOpacity>

      {weatherData && (
        <View style={styles.weatherCard}>
          <Text style={styles.weatherText}>{weatherData.name}</Text>
          <Text style={styles.weatherText}>
            Temp: {weatherData.main.temp}°{unit === "metric" ? "C" : "F"}
          </Text>
          <Text style={styles.weatherText}>Humidity: {weatherData.main.humidity}%</Text>
          <Text style={styles.weatherText}>
            Wind: {weatherData.wind.speed} {unit === "metric" ? "m/s" : "mph"}
          </Text>
          <Text style={styles.weatherText}>
            Weather: {weatherData.weather[0].description}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#f0f8ff",
    flex: 1,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#0077b6",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  toggleButton: {
    borderColor: "#0077b6",
    borderWidth: 2,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  toggleButtonText: {
    color: "#0077b6",
    fontSize: 16,
  },
  weatherCard: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 15,
    elevation: 3,
  },
  weatherText: {
    fontSize: 16,
    marginVertical: 2,
    textAlign: "center",
  },
});
