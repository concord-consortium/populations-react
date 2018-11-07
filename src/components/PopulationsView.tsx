import { Interactive } from "populations.js";
import * as React from "react";

export interface IProps {
  interactive: Interactive;
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
  }

  public componentDidMount() {
    const modelView = this.props.interactive.getEnvironmentPane();
    ((this.envRef as unknown) as Element).appendChild(modelView!);
  }

  public render() {
    return (
      <div id="environment" ref={this.setEnvRef}/>
    );
  }
}
