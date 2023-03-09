interface Props {
  code?: string;
}

export default function CodeBrowser({ code = "" }: Props): React.ReactElement {
  return <iframe width="100%" height="100%" src={"data:text/html," + encodeURIComponent(code)} />;
}
