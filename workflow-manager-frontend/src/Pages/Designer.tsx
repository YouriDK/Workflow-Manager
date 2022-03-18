import { FC } from 'react';
import createEngine, {
  // DefaultLinkModel,
  DefaultNodeModel,
  DiagramModel,
} from '@projectstorm/react-diagrams';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import '../scss/workflow.scss';

// TODO Workflow Designer
const Designer: FC<any> = (): JSX.Element => {
  const engine = createEngine();
  const model = new DiagramModel();

  //3-A) create a default node
  const node1 = new DefaultNodeModel('Node 1', 'rgb(0,192,255)');
  const port1 = node1.addOutPort('Out');
  node1.setPosition(100, 100);

  //3-B) create another default node
  const node2 = new DefaultNodeModel('Node 2', 'rgb(192,255,0)');

  const port2 = node2.addInPort('In');
  node2.setPosition(400, 100);

  //3-C) create another default node
  const node3 = new DefaultNodeModel('Node 3', 'rgb(192,255,0)');
  node2.setPosition(200, 300);

  //3-D) create another default node
  const node4 = new DefaultNodeModel('Node 4', 'rgb(192,255,0)');
  node2.setPosition(400, 400);

  //3-C) link the 2 nodes together
  const link1 = port1.link(port2);

  //4) add the models to the root graph
  model.addAll(node1, node2, link1, node3, node4);

  //5) load model into engine
  engine.setModel(model);

  return (
    <>
      <CanvasWidget className='srd-diagram' engine={engine} />
    </>
  );
};
export default Designer;
