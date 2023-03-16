import SplitPane, { SplitPaneProps } from "react-split-pane";

interface Props {
  children: React.ReactElement;
  height: string | number;
}

export const ResizerUi = ({
  children,
  height,
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
            owerflow-y: none;
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
          // .Pane {
          //   scrollbar-width: none;
          //   overflow-Y: scroll;
          // } 
          // .Pane2 .Pane1{
          //   scrollbar-width: none;
          //   overflow-y: scroll;
          // } 
          // .Pane2 .Pane2{
          //   scrollbar-width: none;
          //   overflow-y: scroll;
          // }
        `}
      </style>
      <SplitPane {...props}>{children}</SplitPane>
    </>
  );
};
