import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

export default function Pin({ color }: any) {
  const navigation = useNavigation(); 
  let iconName = Platform.OS === 'ios' ? 'ios-' : 'md-';
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Map')}>
      <Ionicons name={`${iconName}pin`} color={color} size={26} style={{ padding: 10 }} />
    </TouchableOpacity>
  );
}
