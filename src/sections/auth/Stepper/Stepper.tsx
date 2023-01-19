import {useState} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

const steps = ['School / Location', 'District / Organization', 'Class Created'];

export default function HorizontalNonLinearStepper() {
	const [activeStep, setActiveStep] = useState(0);
	const [completed, setCompleted] = useState<{
		[k: number]: boolean;
	}>({});

	const totalSteps = () => {
		return steps.length;
	};

	const completedSteps = () => {
		return Object.keys(completed).length;
	};

	const isLastStep = () => {
		return activeStep === totalSteps() - 1;
	};

	const allStepsCompleted = () => {
		return completedSteps() === totalSteps();
	};

	const handleNext = () => {
		const newActiveStep =
			isLastStep() && !allStepsCompleted()
				? // It's the last step, but not all steps have been completed,
					// find the first step that has been completed
				steps.findIndex((step, i) => !(i in completed))
				: activeStep + 1;
		setActiveStep(newActiveStep);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleStep = (step: number) => () => {
		setActiveStep(step);
	};

	const handleComplete = () => {
		const newCompleted = completed;
		newCompleted[activeStep] = true;
		setCompleted(newCompleted);
		handleNext();
	};

	const handleReset = () => {
		setActiveStep(0);
		setCompleted({});
	};

	return (
		<Box sx={{ width: '100%' }}>
			<Stepper nonLinear activeStep={activeStep} sx={{mb: 2}}>
				{steps.map((label, index) => (
					<Step key={index} completed={completed[index]}>
						<StepButton color="inherit" onClick={handleStep(index)}>
						</StepButton>
					</Step>
				))}
			</Stepper>
			<div>
				{allStepsCompleted() ? (
					<>
						<Typography sx={{ mt: 2, mb: 1 }}>
							All steps completed - you&apos;re finished
						</Typography>
						<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
							<Box sx={{ flex: '1 1 auto' }} />
							<Button onClick={handleReset}>Reset</Button>
						</Box>
					</>
				) : (
					<>
						{activeStep === 0 && <Step1 />}
						{activeStep === 1 && <Step2 />}
						{activeStep === 2 && <Step3 />}

						<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
							<Button
								color="inherit"
								disabled={activeStep === 0}
								onClick={handleBack}
								sx={{ mr: 1 }}
							>
								Back
							</Button>
							<Box sx={{ flex: '1 1 auto' }} />
							<Button onClick={handleNext} sx={{ mr: 1 }}>
								Next
							</Button>
							{activeStep !== steps.length &&
								(completed[activeStep] ? (
									<Typography variant="caption" sx={{ display: 'inline-block' }}>
										Step {activeStep + 1} already completed
									</Typography>
								) : (
									<Button onClick={handleComplete}>
										{completedSteps() === totalSteps() - 1
											? 'Finish'
											: 'Complete Step'}
									</Button>
								))}
						</Box>
					</>
				)}
			</div>
		</Box>
	);
}
