AFRAME.registerComponent('rounded-plane', {
  schema: {
    color: { type: 'color', default: '#FFF' },
    borderRadius: { type: 'number', default: 0.1 },
    width: { type: 'number', default: 1 },
    height: { type: 'number', default: 1 },
  },

  init: function () {
    this.createRoundedPlane();
  },

  update: function (oldData) {
    const data = this.data;

    if (data.color !== oldData.color ||
      data.borderRadius !== oldData.borderRadius ||
      data.width !== oldData.width ||
      data.height !== oldData.height) {
      this.createRoundedPlane();
    }
  },

  createRoundedPlane: function () {
    const data = this.data;

    // Create rounded rectangle shape
    const roundedRectShape = new THREE.Shape();
    const x = -data.width / 2;
    const y = -data.height / 2;
    const width = data.width;
    const height = data.height;
    const radius = data.borderRadius;

    roundedRectShape.moveTo(x + radius, y);
    roundedRectShape.lineTo(x + width - radius, y);
    roundedRectShape.quadraticCurveTo(x + width, y, x + width, y + radius);
    roundedRectShape.lineTo(x + width, y + height - radius);
    roundedRectShape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    roundedRectShape.lineTo(x + radius, y + height);
    roundedRectShape.quadraticCurveTo(x, y + height, x, y + height - radius);
    roundedRectShape.lineTo(x, y + radius);
    roundedRectShape.quadraticCurveTo(x, y, x + radius, y);

    // Create geometry and mesh
    const geometry = new THREE.ShapeGeometry(roundedRectShape);
    const material = new THREE.MeshBasicMaterial({
      color: data.color,
      side: THREE.DoubleSide
    });

    const mesh = new THREE.Mesh(geometry, material);

    // Update the object's mesh
    if (this.mesh) {
      this.el.removeObject3D('mesh');
    }
    this.mesh = mesh;
    this.el.setObject3D('mesh', mesh);
  },

  remove: function () {
    this.el.removeObject3D('mesh');
  }
});