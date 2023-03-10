import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import { dracula } from "@uiw/codemirror-theme-dracula";
import CodeMirror from "@uiw/react-codemirror";

type Props = {
  code: string;
  setUserCode: Function;
};

export default function StepCode({
  code,
  setUserCode,
}: Props): React.ReactElement {
  return (
    <>
      <CodeMirror
        value={code}
        theme={dracula}
        height="calc(100vh - 48px)"
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        extensions={[loadLanguage("html")]}
        onChange={(value) => {
          setUserCode(value);
        }}
      />
    </>
  );
}
