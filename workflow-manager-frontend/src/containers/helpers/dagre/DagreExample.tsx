import createEngine, {
  DiagramModel,
  NodeModel,
} from '@projectstorm/react-diagrams';
import { FC } from 'react';
import { connectNodes, createNode, DemoWidget } from './DemoWidget';

const DagreExample: FC<any> = (): JSX.Element => {
  //1) setup the diagram engine
  let engine = createEngine();

  //2) setup the diagram model
  let model = new DiagramModel();

  //3) create a default nodes
  let nodesFrom: NodeModel[] = [];
  let nodesTo: NodeModel[] = [];

  nodesFrom.push(createNode('from-1'));
  nodesFrom.push(createNode('from-2'));
  nodesFrom.push(createNode('from-3'));

  nodesTo.push(createNode('to-1'));
  nodesTo.push(createNode('to-2'));
  nodesTo.push(createNode('to-3'));

  //4) link nodes together
  let links = nodesFrom.map((node, index) => {
    return connectNodes(node, nodesTo[index], engine);
  });

  // more links for more complicated diagram
  links.push(connectNodes(nodesFrom[0], nodesTo[1], engine));
  links.push(connectNodes(nodesTo[0], nodesFrom[1], engine));
  links.push(connectNodes(nodesFrom[1], nodesTo[2], engine));

  // initial random position
  nodesFrom.forEach((node, index) => {
    node.setPosition(index * 70, index * 70);
    model.addNode(node);
  });

  nodesTo.forEach((node, index) => {
    node.setPosition(index * 70, 100);
    model.addNode(node);
  });

  links.forEach((link) => {
    model.addLink(link);
  });

  engine.setModel(model);

  return <DemoWidget model={model} engine={engine} />;
};
export default DagreExample;
