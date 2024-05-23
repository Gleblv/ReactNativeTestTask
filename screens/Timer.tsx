import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const Timer: React.FC = () => {
  const [time, setTime] = React.useState<number>(0);
  const [isStarted, setIsStarted] = React.useState(false);
  const timerRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const onPressPlus = () => {
    setTime((prev) => prev + 10);
  };

  const onPressMinus = () => {
    if (time > 0) {
      setTime((prev) => prev - 10);
    }
  };

  const onPressStart = () => {
    setIsStarted((prev) => !prev);
  };

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  React.useEffect(() => {
    if (isStarted) {
      timerRef.current = setInterval(() => {
        setTime((prev) => {
          if (prev < 1) {
            clearInterval(timerRef.current!);
            alert('Timer is over');
            setIsStarted((prev) => !prev);
            return 0;
          }

          return prev - 1;
        });
      }, 1000);
    }

    if (!isStarted && timerRef.current !== null) {
      clearInterval(timerRef.current);
    }
  }, [isStarted]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={styles.timeBox}>
        <Text style={styles.timeCurrnet}>{formatTime(time)}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Pressable onPress={onPressPlus}>
          <Text style={styles.buttonsText}>+10</Text>
        </Pressable>
        <Pressable onPress={onPressMinus}>
          <Text style={styles.buttonsText}>-10</Text>
        </Pressable>
      </View>
      <View>
        <Pressable onPress={onPressStart}>
          <Text style={styles.startText}>{isStarted ? 'Stop' : 'Start'}</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  timeBox: {
    marginBottom: 25,
  },
  timeCurrnet: {
    fontSize: 40,
  },
  buttonsContainer: {
    flexDirection: 'row',
    columnGap: 40,
    marginBottom: 25,
  },
  buttonsText: {
    fontSize: 30,
  },
  startText: {
    fontSize: 20,
  },
});

export default Timer;
