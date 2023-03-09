type Props = {
  code: string;
};

export default function LessonContentBrowser({
  code = "",
}: Props): React.ReactElement {
  return (
    <iframe
      width="100%"
      height="100%"
      frameBorder="none"
      src={"data:text/html," + encodeURIComponent(code)}
    />
  );
}
