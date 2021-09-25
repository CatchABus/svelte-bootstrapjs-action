function createBsInstance(node, args) {
  if (!args.type) {
    throw new Error("No type was given! Please assign a valid Bootstrap class!");
  }
  if (!args.type.getOrCreateInstance) {
    throw new Error("Specified type is not a valid Bootstrap class!");
  }
  if (args.listToAdd && !Array.isArray(args.listToAdd)) {
    throw new Error("Specified list for adding Bootstrap instance must be an array!");
  }
  const bsInstance = args.type.getOrCreateInstance(node, args.config);
  args.listToAdd && args.listToAdd.push(bsInstance);
  return bsInstance;
}

function disposeBsInstance(bsInstance, args) {
  if (args.listToAdd) {
    let index = args.listToAdd.indexOf(bsInstance);
    if (index >= 0) {
      args.listToAdd.splice(index, 1);
    }
  }
  bsInstance.dispose();
}

function bootstrapjs(node, args) {
  if (!args) {
    return;
  }

  let bsArgs = args;
  let obj = createBsInstance(node, args);
  return {
    update(newArgs) {
      disposeBsInstance(obj, bsArgs);
      bsArgs = newArgs;
      obj = createBsInstance(node, bsArgs);
    },
    destroy() {
      disposeBsInstance(obj, bsArgs);
      obj = null;
      bsArgs = null;
    }
  };
}

export default bootstrapjs;