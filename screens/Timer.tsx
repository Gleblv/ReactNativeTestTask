import React from 'react';
import { View, Text, Pressable } from 'react-native';

const Timer: React.FC = () => {
  const [time, setTime] = React.useState<number>(0);
  const [isStarted, setIsStarted] = React.useState(false);
  const timerRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const onPressPlus = () => {
    setTime((prev) => prev + 10);
  };

  const onPressMinus = () => {
    setTime((prev) => prev - 10);
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
      <View>
        <Text>{formatTime(time)}</Text>
      </View>
      <View>
        <Pressable onPress={onPressPlus}>
          <Text>+10</Text>
        </Pressable>
        <Pressable onPress={onPressMinus}>
          <Text>-10</Text>
        </Pressable>
      </View>
      <View>
        <Pressable onPress={onPressStart}>
          <Text>{isStarted ? 'Stop' : 'Start'}</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Timer;
