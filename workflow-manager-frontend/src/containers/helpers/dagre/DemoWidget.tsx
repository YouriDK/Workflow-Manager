import {
  DiagramModel,
  DefaultNodeModel,
  DefaultPortModel,
  DagreEngine,
  DiagramEngine,
  PathFindingLinkFactory,
} from '@projectstorm/react-diagrams';
import * as React from 'react';
import { DemoButton, DemoWorkspaceWidget } from '../DemoWorkspaceWidget';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { DemoCanvasWidget } from '../DemoCanvasWidget';

export function createNode(name: any, color: any = 'rgb(0,192,255)'): any {
  return new DefaultNodeModel(name, color);
}

let count = 0;

export function connectNodes(
  nodeFrom: any,
  nodeTo: any,
  engine: DiagramEngine
) {
  //just to get id-like structure
  count++;
  const portOut = nodeFrom.addPort(
    new DefaultPortModel(true, `${nodeFrom.name}-out-${count}`, 'Out')
  );
  const portTo = nodeTo.addPort(
    new DefaultPortModel(false, `${nodeFrom.name}-to-${count}`, 'IN')
  );
  return portOut.link(portTo);

  // ################# UNCOMMENT THIS LINE FOR PATH FINDING #############################
  // return portOut.link(portTo, engine.getLinkFactories().getFactory(PathFindingLinkFactory.NAME));
  // #####################################################################################
}

/**
 * Tests auto distribution
 */
export class DemoWidget extends React.Component<
  { model: DiagramModel; engine: DiagramEngine },
  any
> {
  engine: DagreEngine;

  constructor(props: any) {
    super(props);
    this.engine = new DagreEngine({
      graph: {
        rankdir: 'RL',
        ranker: 'longest-path',
        marginx: 25,
        marginy: 25,
      },
      includeLinks: true,
    });
  }

  autoDistribute = () => {
    this.engine.redistribute(this.props.model);

    // only happens if pathfing is enabled (check line 25)
    this.reroute();
    this.props.engine.repaintCanvas();
  };

  componentDidMount(): void {
    setTimeout(() => {
      this.autoDistribute();
    }, 500);
  }

  reroute() {
    this.props.engine
      .getLinkFactories()
      .getFactory<PathFindingLinkFactory>(PathFindingLinkFactory.NAME)
      .calculateRoutingMatrix();
  }

  render() {
    return (
      <DemoWorkspaceWidget
        buttons={
          <DemoButton onClick={this.autoDistribute}>Re-distribute</DemoButton>
        }
      >
        <DemoCanvasWidget>
          <CanvasWidget engine={this.props.engine} />
        </DemoCanvasWidget>
      </DemoWorkspaceWidget>
    );
  }
}
