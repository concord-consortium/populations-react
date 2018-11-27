import { Interactive, EnvironmentMouseEvent, AgentEnvironmentMouseEvent } from "populations.js";
import * as React from "react";

export interface IProps {
  interactive: Interactive;
  width?: number;
  height?: number;
  maxWidth?: number;
  maxHeight?: number;
  agentClickDistance?: number;
  onMouseEvent?: (evt: EnvironmentMouseEvent) => void;
  onAgentMouseEvent?: (evt: AgentEnvironmentMouseEvent) => void;
}

// tslint:disable-next-line:no-empty-interface
export interface IState {}

export default class PopulationsView extends React.Component<IProps, IState> {

  private envRef: React.RefObject<{}>|null;
  private setEnvRef: (element: any) => void;

  constructor(props: IProps) {
    super(props);

    this.envRef = null;
    this.setEnvRef = (element) => {
      this.envRef = element;
    };

    const {interactive, onMouseEvent, onAgentMouseEvent} = this.props;

    if (onMouseEvent) {
      interactive.addMouseListener(onMouseEvent);
    }

    if (onAgentMouseEvent) {
      interactive.addAgentMouseListener(onAgentMouseEvent, this.props.agentClickDistance);
    }
  }

  public componentDidMount() {
    const modelView = this.props.interactive.getEnvironmentPane();
    ((this.envRef as unknown) as Element).appendChild(modelView!);
    this.resize();
  }

  public componentDidUpdate(prevProps: IProps) {
    if (prevProps.width !== this.props.width || prevProps.height !== this.props.height) {
      this.resize();
    }
  }

  public render() {
    return (
      <div className="populations-environment" ref={this.setEnvRef}/>
    );
  }

  private resize() {
    const {interactive, width, height, maxWidth, maxHeight} = this.props;

    if (width && height) {
      throw Error("PopulationsView: Can use either width or height, but not both");
    }
    if ((width || height) && (maxWidth || maxHeight)) {
      throw Error("PopulationsView: Can use either width/height, or minWidth and minHeight, but not both");
    }
    if ((maxWidth && !maxHeight) || (!maxWidth && maxHeight)) {
      throw Error("PopulationsView: Must use minWidth and minHeight in conjuction");
    }

    if (width) {
      interactive.setEnvironmentDisplayWidth(width);
    } else if (height) {
      interactive.setEnvironmentDisplayHeight(height);
    } else if (maxWidth && maxHeight) {
      interactive.constrain(maxWidth, maxHeight);
    }
  }
}
