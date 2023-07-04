import SplitPane, { SplitPaneProps } from "react-split-pane";

interface Props {
  children: React.ReactNode;
}

export const ResizerUi = ({
  children,
  ...props
}: Props & SplitPaneProps): React.ReactElement => {
  return (
    <>
      <style>
        {`
          .Resizer {
            background: #000;
            opacity: 0.2;
            z-index: 1;
            -moz-box-sizing: border-box;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            -moz-background-clip: padding;
            -webkit-background-clip: padding;
            background-clip: padding-box;
            owerflow-y: scroll;
          }
          ::-webkit-scrollbar {
             width: 0
          }
          .Resizer.vertical {
            width: 11px;
            margin: 0 -5px;
            border-left: 5px solid rgba(255, 255, 255, 0);
            border-right: 5px solid rgba(255, 255, 255, 0);
            cursor: col-resize;
            position: initial;
          }
          .Resizer.vertical:hover {
            border-left: 5px solid rgba(0, 0, 0, 0.5);
            border-right: 5px solid rgba(0, 0, 0, 0.5);
          }
          .Resizer.disabled {
            cursor: not-allowed;
          }
          .Resizer.disabled:hover {
            border-color: transparent;
          }
          .SplitPane{
            max-height: calc(100vh - 48px);
          }
          .Pane1{
            overflow-y: auto;
          }
          .Pane2 {
            overflow-y: hidden;
            max-height: calc(100vh - 48px);
          }
        `}
      </style>
      <SplitPane {...props}>{children}</SplitPane>
    </>
  );
};
