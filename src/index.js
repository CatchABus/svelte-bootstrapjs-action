function createBsInstance(node, args) {
  if (!args.type) {
    throw new Error("Invalid type! Please assign a boostrap class.");
  }

  if (args.listToAdd != null && !Array.isArray(args.listToAdd)) {
    throw new Error("Specified list for adding bootstrap instance must be an array!");
  }

  let bsInstance = null;
  try {
    bsInstance = new args.type(node, args.config);
  } catch(err) {
    throw new Error(`Type "${args.type}" is not a valid constructor!`);
  }
  args.listToAdd != null && args.listToAdd.push(bsInstance);
  return bsInstance;
}

function disposeBsInstance(bsInstance, args) {
  if (args.listToAdd != null) {
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