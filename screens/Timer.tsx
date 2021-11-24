import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import {StopWatchTimer} from '../utils/timer';
// import components
import ButtonText from '../components/ButtonText';

const Timer = () => {

  function handleStart() {
    timer.current?.start();
  }
  function handlPause() {
    timer.current?.pause();
  }
  function handleReset() {
    timer.current?.stop();
    setCurrentTime("0min 0s")
  }

  const [currentTime, setCurrentTime ] = useState<string>("0min 0s");
  const timer: React.MutableRefObject<StopWatchTimer | null> = useRef(null);

  useEffect(() => {
    timer.current = new StopWatchTimer(2000);
    timer.current
    .onTick((min, s, total) => {
      setCurrentTime(`${min}min ${s}s`)
    });
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{currentTime}</Text>
      <View style={styles.controllers}>
        <ButtonText handlePress={handleStart}>Start</ButtonText>
        <ButtonText handlePress={handlPause}>Pause</ButtonText>
        <ButtonText handlePress={handleReset}>Reset</ButtonText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: "50%"
  },
  timer: {
    fontSize: 30,
    fontWeight: "bold",
    paddingBottom: 20
  },
  controllers: {
    width: "100%",
    flexDirection: "row",
    justifyContent: 'space-between'
  }
});

export default Timer;