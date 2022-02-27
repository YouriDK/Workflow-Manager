import createEngine, {
  DiagramModel,
  NodeModel,
  PathFindingLinkFactory,
} from '@projectstorm/react-diagrams';
import _ from 'lodash';
const engineOptions = {
  registerDefaultPanAndZoomCanvasAction: true,
  registerDefaultZoomCanvasAction: false,
};

const action = (text: string) => {};
// !	model.setLocked(true);
export const listen = () => {
  let models: any;
  models.forEach((item: any) => {
    item.registerListener({
      eventDidFire: action('element eventDidFire'),
    });
  });
};

const updatePosition = () => {
  let engine = createEngine();
  let model = engine.getModel();
  const nodes = model.getNodes();
  let node = nodes[Object.keys(nodes)[0] as any] as any;
  node.setPosition(node.getX() + 30, node.getY() + 30);
  engine.repaintCanvas();
};

const updatePositionViaSerialize = () => {
  let engine = createEngine();
  let model = engine.getModel();
  let str = JSON.stringify(model.serialize());
  let model2 = new DiagramModel();
  let obj: ReturnType<DiagramModel['serialize']> = JSON.parse(str);
  let node: ReturnType<NodeModel['serialize']> = _.values(
    obj.layers[1].models
  )[0] as any;
  node.x += 30;
  node.y += 30;

  model2.deserializeModel(obj, engine);
  engine.setModel(model2);
};
const serize = () => {
  let engine = createEngine();
  let model = engine.getModel();
  //!------------- SERIALIZING ------------------

  var str = JSON.stringify(model.serialize());

  //!------------- DESERIALIZING ----------------

  var model2 = new DiagramModel();
  model2.deserializeModel(JSON.parse(str), engine);
  engine.setModel(model2);

  // ! SMART ROUTING
  const pathfinding = engine
    .getLinkFactories()
    .getFactory<PathFindingLinkFactory>(PathFindingLinkFactory.NAME);
  // *	const link1 = port1.link(port4, pathfinding);
};
