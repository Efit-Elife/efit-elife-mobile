import {
  Accuracy,
  LocationObject,
  LocationSubscription,
  requestForegroundPermissionsAsync,
  watchPositionAsync,
} from "expo-location";
import { useEffect, useRef, useState } from "react";

const useLocation = (
  shouldTrack: boolean,
  cb: (location: LocationObject) => void
) => {
  const [err, setErr] = useState<Error | null>(null);
  const subscriberRef = useRef<LocationSubscription | null>(null);

  useEffect(() => {
    const startWatching = async () => {
      try {
        const { granted } = await requestForegroundPermissionsAsync();
        if (!granted) throw new Error("Location permission not granted");

        setErr(null);
        subscriberRef.current = await watchPositionAsync(
          {
            accuracy: Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 10,
          },
          cb
        );
      } catch (e) {
        if (e instanceof Error) setErr(e);
      }
    };

    const removeSubscriber = () => {
      if (!subscriberRef.current) return;
      subscriberRef.current.remove();
      subscriberRef.current = null;
    };

    if (shouldTrack) startWatching();
    else removeSubscriber();

    return () => {
      removeSubscriber();
    };
  }, [shouldTrack, cb]);

  return [err] as const;
};

export default useLocation;
