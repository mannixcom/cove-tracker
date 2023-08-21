interface TideData {
    /** The status code of the request. */
    status: number;
    /** The latitude of the request location. */
    requestLat: number;
    /** The longitude of the request location. */
    requestLon: number;
    /** The latitude of the response location. */
    responseLat: number;
    /** The longitude of the response location. */
    responseLon: number;
    /** The name of the atlas used to generate the response. */
    atlas: string;
    /** The name of the station that the data is for. */
    station: string;
    /**
     * An array of objects that contain the tide heights.
     *
     * The `dt` property is the time of the measurement, in Unix timestamp format.
     * The `date` property is the date of the measurement, in ISO 8601 format.
     * The `height` property is the height of the tide, in meters.
     */
    heights: Array<Height>;
  }
  
  interface Height {
    /** The time of the measurement, in Unix timestamp format. */
    dt: number;
    /** The date of the measurement, in ISO 8601 format. */
    date: string;
    /** The height of the tide, in meters. */
    height: number;
  }