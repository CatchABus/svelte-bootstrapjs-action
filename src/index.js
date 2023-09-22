function createBsInstance(node, args) {
  if (!args.type) {
    throw new Error("No type was given! Please assign a valid Bootstrap class!");
  }
  if (!args.type.getOrCreateInstance) {
    throw new Error("Specified type is not a valid Bootstrap class!");
  }
  const bsInstance = args.type.getOrCreateInstance(node, typeof args.config === "function" ? args.config(node) : args.config);
  return bsInstance;
}

function bootstrapjs(node, args) {
  if (!args) {
    return;
  }

  let bsArgs = args;
  let obj = createBsInstance(node, bsArgs);
  bsArgs.mount && bsArgs.mount(obj);

  return {
    update(newArgs) {
      // For now, consider updating only if a new instance using a different class is requested
      if (bsArgs.type != newArgs.type) {
        bsArgs = newArgs;

        if (obj) {
          obj.dispose();
          obj = null;
        }

        if (bsArgs) {
          obj = createBsInstance(node, bsArgs);
        }
      }
    },
    destroy() {
      if (bsArgs) {
        bsArgs.destroy && bsArgs.destroy(obj);
        if (obj) {
          obj.dispose();
          obj = null;
        }
      }
    }
  };
}

export default bootstrapjs;