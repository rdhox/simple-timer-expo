import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

interface Props {
  children: string;
  handlePress: () => any;
};

const ButtonText: React.FC<Props> = (props) => {

  const {
    children,
    handlePress
  } = props;

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={styles.container}
    >
      <Text>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10
  }
});

export default ButtonText;