interface WeatherData {
    /** The weather data for each hour. */
    hours: Array<{
      /** The air temperature at the time, in degrees Celsius. */
      airTemperature: {
        /** The temperature from DWD. */
        dwd: number;
        /** The temperature from NOAA. */
        noaa: number;
        /** The temperature from SG. */
        sg: number;
      };
      /** The cloud cover, in percent. */
      cloudCover: {
        /** The cloud cover from DWD. */
        dwd: number;
        /** The cloud cover from NOAA. */
        noaa: number;
        /** The cloud cover from SG. */
        sg: number;
      };
      /** The amount of precipitation that has fallen, in millimeters. */
      precipitation: {
        /** The precipitation from DWD. */
        dwd: number;
        /** The precipitation from NOAA. */
        noaa: number;
        /** The precipitation from SG. */
        sg: number;
      };
      /** The air pressure, in millibars. */
      pressure: {
        /** The pressure from DWD. */
        dwd: number;
        /** The pressure from NOAA. */
        noaa: number;
        /** The pressure from SG. */
        sg: number;
      };
      /** The average period between wave crests, in seconds. */
      swellPeriod: {
        /** The swell period from DWD. */
        dwd: number;
        /** The swell period from ICON. */
        icon: number;
        /** The swell period from METEO. */
        meteo: number;
        /** The swell period from NOAA. */
        noaa: number;
        /** The swell period from SG. */
        sg: number;
      };
      /** The time of the measurement, in ISO 8601 format. */
      time: string;
      /** The water temperature, in degrees Celsius. */
      waterTemperature: {
        /** The water temperature from METEO. */
        meto: number;
        /** The water temperature from NOAA. */
        noaa: number;
        /** The water temperature from SG. */
        sg: number;
      };
      /** The direction of the waves, in degrees. */
      waveDirection: {
        /** The wave direction from ICON. */
        icon: number;
        /** The wave direction from METEO. */
        meteo: number;
        /** The wave direction from NOAA. */
        noaa: number;
        /** The wave direction from SG. */
        sg: number;
      };
      /** The height of the waves, in meters. */
      waveHeight: {
        /** The wave height from DWD. */
        dwd: number;
        /** The wave height from ICON. */
        icon: number;
        /** The wave height from METEO. */
        meteo: number;
        /** The wave height from NOAA. */
        noaa: number;
        /** The wave height from SG. */
        sg: number;
      };
      /** The direction of the wind, in degrees. */
      windDirection: {
        /** The wind direction from ICON. */
        icon: number;
        /** The wind direction from NOAA. */
        noaa: number;
        /** The wind direction from SG. */
        sg: number;
      };
      /** The speed of the wind, in meters per second. */
      windSpeed: {
        /** The wind speed from ICON. */
        icon: number;
        /** The wind speed from NOAA. */
        noaa: number;
        /** The wind speed from SG. */
        sg: number;
      };
    }>;
  }