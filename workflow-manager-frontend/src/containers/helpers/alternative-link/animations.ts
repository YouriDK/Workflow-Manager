let node1: any, node2: any, node3: any, node4: any, engine: any;
export var interval = setInterval(() => {
  [node1, node2, node3, node4].map((node) => {
    var obj = { x: 0, y: 0 };
    gsap.fromTo(
      obj,
      {
        x: node.getPosition().x,
        y: node.getPosition().y,
      },
      {
        x: Math.floor(Math.random() * 500),
        y: Math.floor(Math.random() * 500),
        duration: 0.8,
        onUpdate: () => {
          node.setPosition(obj.x, obj.y);
          engine.repaintCanvas();
        },
      }
    );
  });
}, 2000);
