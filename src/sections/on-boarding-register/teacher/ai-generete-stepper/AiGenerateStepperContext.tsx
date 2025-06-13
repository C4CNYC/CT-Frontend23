import { Role } from '@root/src/redux/services/enums/role.enum';
import { ILesson } from '@root/src/redux/services/interfaces/courseUnits.interface';
import { useGetLessonsByIdsQuery } from '@root/src/redux/services/manager/lessons-manager';
import { useGetPropertiesQuery } from '@root/src/redux/services/manager/properties-manager';
import { useSelector } from '@root/src/redux/store';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type AiGenerateStepperContextType = {
  activeStep: number;
  setActiveStep: (step: number) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  aiLessons: ILesson[] | undefined;
  nextStep: () => void;
  prevStep: () => void;
};

const AiGenerateStepperContext = createContext<AiGenerateStepperContextType | undefined>(undefined);

export const AiGenerateStepperProvider = ({ children, initialStep = 0 }: { children: ReactNode; initialStep?: number }) => {
  const [activeStep, setActiveStep] = useState(initialStep);
  const [aiLessons, aiLessonsSet] = useState<ILesson[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const nextStep = () => setActiveStep(activeStep + 1)
  const prevStep = () => setActiveStep(activeStep - 1)
  const profile = useSelector((state) => state.global.user)

  const { data: properties } = useGetPropertiesQuery({
    entityType: 'lesson',
    propertyName: 'aiTemplate',
  })
  const { data: aiTemplates } = useGetLessonsByIdsQuery(
    properties?.data.map((item) => item.entityId) ?? []
  )
  useEffect(() => {
    if (!aiTemplates || aiTemplates.length < 1) return;
    if (profile?.role && [Role.SuperAdmin, Role.Admin].includes(profile.role)) {
      aiLessonsSet(aiTemplates);
    } else {
      aiLessonsSet(aiTemplates.filter((t) => t.active));
    }
  }, [aiTemplates])

  return (
    <AiGenerateStepperContext.Provider value={{
      activeStep, setActiveStep, isLoading, setIsLoading,
      aiLessons,
      nextStep, prevStep
    }}>
      {children}
    </AiGenerateStepperContext.Provider>
  );
};

export const useAiGenerateStepper = () => {
  const context = useContext(AiGenerateStepperContext);
  if (!context) {
    throw new Error('useAiGenerateStepper must be used within an AiGenerateStepperProvider');
  }
  return context;
};