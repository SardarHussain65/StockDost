import React, { useState } from 'react';
import { View } from 'react-native';
import { Header2 } from '../../../components/common/Header2';
import { CustomButton } from '../../../components/common/CustomButton';
import { styles } from './styles';
import { FeatureItem } from './Components';
import { ONBOARDING_STEPS } from '../../../constants';
import { colors } from '../../../styles/colors';

export default function OnboardingScreen({ navigation }: any) {
  const handleNext = () => {
    if (currentStep === 2) {
      navigation.navigate('SignUp');
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleSkip = () => {
    navigation.navigate('SignUp');
  };

  const [currentStep, setCurrentStep] = useState<number>(0);

  const activeStep = ONBOARDING_STEPS[currentStep];
  return (
    <View style={{ ...styles.container }}>
      <Header2
        title=""
        back={true}
        useSkip={true}
        handleSkip={handleSkip}
        handleBackPress={() => {
          if (currentStep === 0) {
            // navigation.goBack();
            console.log("There are no any back screen here");
          } else {
            setCurrentStep(prev => --prev);
          }
        }}
      />

      <FeatureItem
        title={activeStep?.title}
        content={activeStep?.content}
        imgSrc={activeStep?.imgSrc}
      />

      <View style={styles.onboardingProgress}>
        {ONBOARDING_STEPS.map((_, index) => (
          <View
            key={index}
            style={{
              ...styles.activeStepIndicator,
              backgroundColor:
                index === currentStep ? colors.primary : colors.border,
            }}
          />
        ))}
      </View>

      <CustomButton title="Next" onPress={handleNext} disabled={false} style={{ marginBottom: 20 }} />
    </View>
  );
}
