import { tick } from "svelte";

function createBsInstance(node, args) {
  if (!args.type) {
    throw new Error("No type was given! Please assign a valid Bootstrap class!");
  }
  if (!args.type.getOrCreateInstance) {
    throw new Error("Specified type is not a valid Bootstrap class!");
  }
  const bsInstance = args.type.getOrCreateInstance(node, args.config);
  return bsInstance;
}

function bootstrapjs(node, args) {
  if (!args) {
    return;
  }

  let isUpdating = true;

  let bsArgs = args;
  let obj = createBsInstance(node, bsArgs);
  bsArgs.mount && bsArgs.mount(obj);

  tick().then(() => isUpdating = false);

  return {
    update(newArgs) {
      if (isUpdating) {
        return;
      }

      isUpdating = true;

      const oldObj = obj;
      oldObj.dispose();

      bsArgs = newArgs;
      obj = createBsInstance(node, bsArgs);
      bsArgs.update && bsArgs.update(obj, oldObj);

      tick().then(() => isUpdating = false);
    },
    destroy() {
      bsArgs.destroy && bsArgs.destroy(obj);
      obj.dispose();
      obj = null;
      bsArgs = null;
    }
  };
}

export default bootstrapjs;