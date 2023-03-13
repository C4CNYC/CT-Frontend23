interface Props {
  code?: string;
}

export default function CodeBrowser({ code = "" }: Props): React.ReactElement {
  return (
    <iframe
      width="100%"
      frameBorder="none"
      height="100%"
      src={"data:text/html," + encodeURIComponent(code)}
    />
  );
}
