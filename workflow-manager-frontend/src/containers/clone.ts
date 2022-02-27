import { BaseModel } from '@projectstorm/react-canvas-core';
import { NodeModel, LinkModel } from '@projectstorm/react-diagrams';
import _ from 'lodash';

export const cloneSelected = (props: any) => {
  let { engine } = props;
  let offset = { x: 100, y: 100 };
  let model = engine.getModel();

  let itemMap = {};
  _.forEach(model.getSelectedEntities(), (item: BaseModel<any>) => {
    let newItem = item.clone(itemMap);

    // offset the nodes slightly
    if (newItem instanceof NodeModel) {
      newItem.setPosition(newItem.getX() + offset.x, newItem.getY() + offset.y);
      model.addNode(newItem);
    } else if (newItem instanceof LinkModel) {
      // offset the link points
      newItem.getPoints().forEach((p) => {
        p.setPosition(p.getX() + offset.x, p.getY() + offset.y);
      });
      model.addLink(newItem);
    }
    (newItem as BaseModel).setSelected(false);
  });

  // ! this.forceUpdate();
};
