import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Chevron } from 'react-native-shapes';
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import styled from 'styled-components/native';

const pickerStyle = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: '#f33328',
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 10,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: '#f33328',
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 10,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  placeholderColor: 'white',
  underline: { borderTopWidth: 0 },
  iconContainer: {
    top: 25,
    right: 15,
  },
};

const MainWarp = styled.View`
  background-color: white;
  flex: 1;
`;

const StepView = styled.View`
  align-items: center;
  padding: 0 60px 0 60px;
`;

const Title = styled.Text`
  font-size: 25px;
  text-align: center;
`;

const SubTitle = styled.Text`
  font-size: 15px;
  text-align: center;
`;

const TextInput = styled.TextInput`
  width: 100%;
  padding: 8px;
  border: solid 2px #f33328;
  border-radius: 20px;
  margin: 10px 0 10px 0;
  font-size: 16px;
`;

const OnBtn = styled.TouchableOpacity`
  width: 100%;
  padding: 8px;
  background-color: #f33328;
  border: solid 2px #f33328;
  justify-content: center;
  align-items: center;
  margin: 40px 0 10px 0;
  border-radius: 50px;
`;

const OnBtnText = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: bold;
`;

const OffBtn = styled.TouchableOpacity`
  width: 100%;
  padding: 8px;
  background-color: #ffffff;
  border: solid 2px #f33328;
  justify-content: center;
  align-items: center;
  margin: 40px 0 10px 0;
  border-radius: 50px;
`;

const OffBtnText = styled.Text`
  color: black;
  font-size: 20px;
  font-weight: bold;
`;

const MainText = styled.TextInput`
  width: 300px;
  height: 250px;
  padding: 8px;
  border: solid 2px #f33328;
  border-radius: 20px;
  margin: 40px 0 10px 0;
  font-size: 13px;
`;

const ImageView = styled.View`
  margin-top: 40px;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
`;

const ImageBtn = styled.TouchableOpacity`
  width: 300px;
  height: 250px;
  background-color: white;
  border: solid 2px #f33328;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const buttonTextStyle = {
  color: '#ffffff',
  padding: 10,
  width: 90,
  textAlign: 'center',
  borderWidth: 2,
  borderColor: '#f33328',
  backgroundColor: '#f33328',
  borderRadius: 20,
  overflow: 'hidden',
};

export default function () {
  let iconName = Platform.OS === 'ios' ? 'ios-' : 'md-';
  const navigation = useNavigation();
  const [RedBlood, setRedBlood] = useState(false); // 적혈구
  const [Platelets, setPlatelets] = useState(false); // 혈소판
  const [Plasma, setPlasma] = useState(false); // 혈장

  const [image, setImage] = useState<any>(null);

  const requestPermisison = async () => {
    const response = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    console.log(response);
  };

  useEffect(() => {
    requestPermisison();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  function handleSubmit() {
    alert('등록이 완료되었습니다.');
    navigation.goBack();
  }

  return (
    <MainWarp>
      <ProgressSteps>
        <ProgressStep
          label="도옴"
          nextBtnTextStyle={buttonTextStyle}
          nextBtnText="다음"
        >
          <StepView>
            <Title>어떤 도옴이 필요하신가요?</Title>
            {RedBlood ? (
              <OnBtn onPress={() => setRedBlood(false)}>
                <OnBtnText>적혈구</OnBtnText>
              </OnBtn>
            ) : (
              <OffBtn onPress={() => setRedBlood(true)}>
                <OffBtnText>적혈구</OffBtnText>
              </OffBtn>
            )}
            {Platelets ? (
              <OnBtn onPress={() => setPlatelets(false)}>
                <OnBtnText>혈소판</OnBtnText>
              </OnBtn>
            ) : (
              <OffBtn onPress={() => setPlatelets(true)}>
                <OffBtnText>혈소판</OffBtnText>
              </OffBtn>
            )}
            {Plasma ? (
              <OnBtn onPress={() => setPlasma(false)}>
                <OnBtnText>혈장</OnBtnText>
              </OnBtn>
            ) : (
              <OffBtn onPress={() => setPlasma(true)}>
                <OffBtnText>혈장</OffBtnText>
              </OffBtn>
            )}
          </StepView>
        </ProgressStep>
        <ProgressStep
          label="정보"
          nextBtnTextStyle={buttonTextStyle}
          previousBtnTextStyle={buttonTextStyle}
          nextBtnText="다음"
          previousBtnText="이전"
        >
          <StepView>
            <Title>도옴받으실 분의 {'\n'}정보를 적어주세요.</Title>
            <TextInput
              placeholder="이름"
              style={{ marginTop: 40 }}
              returnKeyType="next"
              enablesReturnKeyAutomatically
            />
            <RNPickerSelect
              onValueChange={(value) => console.log(value)}
              placeholder={{
                label: '혈액형',
                value: null,
                color: '#f33328',
              }}
              style={pickerStyle}
              Icon={() => {
                return <Chevron size={1.5} color="gray" />;
              }}
              items={[
                { label: 'A+', value: 'A+' },
                { label: 'A-', value: 'A-' },
                { label: 'B+', value: 'B+' },
                { label: 'B-', value: 'B-' },
                { label: 'AB+', value: 'AB+' },
                { label: 'AB-', value: 'AB-' },
                { label: 'O-', value: 'O-' },
                { label: 'O-', value: 'O-' },
              ]}
            />

            <TextInput placeholder="의료기관명" />
            <TextInput placeholder="환자등록번호" />
          </StepView>
        </ProgressStep>
        <ProgressStep
          label="내용"
          nextBtnTextStyle={buttonTextStyle}
          previousBtnTextStyle={buttonTextStyle}
          nextBtnText="다음"
          previousBtnText="이전"
        >
          <StepView>
            <Title>도옴받고자 하는 {'\n'}내용을 적어주세요.</Title>
            <SubTitle>이 내용은 헌혈자가 보는 게시글의 내용이에요!</SubTitle>
            <MainText placeholder="내용을 적어주세요." multiline />
          </StepView>
        </ProgressStep>
        <ProgressStep
          label="사진"
          nextBtnTextStyle={buttonTextStyle}
          previousBtnTextStyle={buttonTextStyle}
          finishBtnText="등록"
          previousBtnText="이전"
          onSubmit={handleSubmit}
        >
          <StepView>
            <Title>도옴받으실 분의 {'\n'}사진을 올려주세요.</Title>
            <SubTitle>헌혈자와 가까워지는 계기가 될 거예요.</SubTitle>
            <ImageView
              style={{ alignItems: 'center', justifyContent: 'center' }}
            >
              {image ? (
                <ImageBtn onPress={pickImage}>
                  <Image source={{ uri: image }} onPress={pickImage} />
                </ImageBtn>
              ) : (
                <ImageBtn onPress={pickImage}>
                  <Ionicons
                    name={`${iconName}add`}
                    color={'#f33328'}
                    size={50}
                    style={{ padding: 10 }}
                  />
                </ImageBtn>
              )}
            </ImageView>
          </StepView>
        </ProgressStep>
      </ProgressSteps>
    </MainWarp>
  );
}
