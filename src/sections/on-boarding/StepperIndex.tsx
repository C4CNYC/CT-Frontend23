import { Stepper } from "@mui/material";
import { useAtom } from "jotai";
import HelloStep from "./hello-step/HelloStep";
import { IviteStep } from "./invite-step/InviteStep";
import LanguageStep from "./language-step/LanguageStep";
import { stepperAtom } from "./stepper-atom";

export default function StepperIndex(): React.ReactElement {
  //   const steps = [
  //     { title: "Hi,", subtitle: "Let’s start a learning adventure" },
  //     {
  //       title: "Select a Language",
  //       subtitle: "Chose the project you will be using",
  //     },
  //     {
  //       title: "Select a Course",
  //       subtitle: "Project-based, hands-on and modular",
  //     },
  //     {
  //       title: "Create Group",
  //       subtitle: "Learn and interact in your preferred format",
  //     },
  //     {
  //       title: "Invite your crew",
  //       subtitle: "Invite anyone to your session sending a join-link",
  //     },
  //     { title: "Edit", subtitle: "Update the header and title" },
  //   ];
  const [step] = useAtom(stepperAtom);
  return (
    <>
      <Stepper>
        {step === 0 && <HelloStep />}
        {step === 1 && <LanguageStep />}
        {step === 2 && <LanguageStep />}
        {step === 3 && <IviteStep />}
      </Stepper>
    </>
  );
}
