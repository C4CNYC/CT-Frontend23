import { createContext, useContext, useState, ReactNode } from 'react';

interface CodePanelProgressContextProps {
  progress: number;
  setProgress: (progress: number) => void;
}

const CodePanelProgressContext = createContext<CodePanelProgressContextProps>({
  progress: 0,
  setProgress: () => {},
});

interface CodePanelProgressProviderProps {
  children: ReactNode;
  lessonId: string
}

export const CodePanelProgressProvider = ({ children, lessonId }: CodePanelProgressProviderProps) => {
  const [progress, setProgress] = useState<number>(0);
  const progressKey = `${lessonId}_progress`
  

  return (
    <CodePanelProgressContext.Provider value={{ progress, setProgress }}>
      {children}
    </CodePanelProgressContext.Provider>
  );
};

export const useCodePanelProgress = () => useContext(CodePanelProgressContext);
