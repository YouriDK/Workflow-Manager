import { CanvasWidget } from '@projectstorm/react-canvas-core';
import createEngine, {
  DefaultNodeModel,
  DiagramModel,
} from '@projectstorm/react-diagrams';
import { FC } from 'react';
import { DemoCanvasWidget } from '../DemoCanvasWidget';
import { AdvancedLinkFactory, AdvancedPortModel } from './CustomLinkModel';

const CustomLinkExampleBis: FC<any> = (): JSX.Element => {
  var engine = createEngine();
  engine.getLinkFactories().registerFactory(new AdvancedLinkFactory());

  // create some nodes
  var node1 = new DefaultNodeModel('Source', 'rgb(0,192,255)');
  let port1 = node1.addPort(new AdvancedPortModel(false, 'out'));
  node1.setPosition(100, 100);

  var node2 = new DefaultNodeModel('Target', 'rgb(192,255,0)');
  var port2 = node2.addPort(new AdvancedPortModel(true, 'in'));
  node2.setPosition(500, 350);

  var node3 = new DefaultNodeModel('Source', 'rgb(0,192,255)');
  let port3 = node3.addPort(new AdvancedPortModel(false, 'out'));
  node3.setPosition(100, 500);

  var node4 = new DefaultNodeModel('Target', 'rgb(192,255,0)');
  var port4 = node4.addPort(new AdvancedPortModel(true, 'in'));
  node4.setPosition(500, 450);

  var model = new DiagramModel();

  model.addAll(port1.link(port2), port3.link(port4));

  // add everything else
  model.addAll(node1, node2, node3, node4);

  // load model into engine
  engine.setModel(model);

  // render the diagram!
  return (
    <DemoCanvasWidget>
      <CanvasWidget engine={engine} />
    </DemoCanvasWidget>
  );
};
export default CustomLinkExampleBis;
