import * as Location from "expo-location";

const tenMetersWithDegrees = 0.0001;

export const getLocation = (
  increment: number,
  startLatitude: number,
  startLongitude: number
) => ({
  timestamp: Date.now(),
  coords: {
    speed: 0,
    heading: 0,
    accuracy: 5,
    altitudeAccuracy: 5,
    altitude: 5,
    latitude: startLatitude + increment * tenMetersWithDegrees, // Current latitude
    longitude: startLongitude + increment * tenMetersWithDegrees, // Current longitude
  },
});

let counter = 0;
let interval: number | null = null;

export const startMockLocation = (
  startLatitude: number,
  startLongitude: number
) => {
  if (interval) return;

  counter = 0;
  interval = setInterval(() => {
    const location = getLocation(counter, startLatitude, startLongitude);
    Location.EventEmitter.emit("Expo.locationChanged", {
      watchId: Location._getCurrentWatchId(),
      location,
    });
    counter++;
  }, 1000);
};

export const stopMockLocation = () => {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
  counter = 0;
};
