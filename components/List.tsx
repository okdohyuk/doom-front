import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

const Container = styled.TouchableOpacity`
  width: ${WIDTH / 3.5}px;
  position: relative;
  margin: 8.9px;
  box-shadow: 0 1px 6px rgba(32, 33, 36, 0.4);
`;

const Deminus = styled.Text`
  z-index: 2;
  padding: 2px;
  position: absolute;
  flex-direction: row;
  color: white;
`;

const Image = styled.Image`
  width: 100%;
  height: ${WIDTH / 3.5}px;
  border-radius: 5px;
  border-color: #fff;
  border-width: 1px;
`;

const Name = styled.Text`
  font-size: 15px;
  font-weight: 900;
  line-height: 35px;
`;

const Date = styled.Text`
  line-height: 15px;
`;

const BloodType = styled.Text`
  line-height: 20px;
`;

export default function () {
  const navigation = useNavigation();
  return (
    <Container onPress={() => navigation.navigate('Detail')}>
      <Deminus style={{ backgroundColor: 'red' }}>D-1</Deminus>
      <Image source={require('../images/patient_1.jpg')} />
      <Name>김현성</Name>
      <Date>~20-11-10</Date>
      <BloodType>🩸A+ 혈소판</BloodType>
    </Container>
  );
}
