import { tick } from "svelte";

function bootstrapjs(node, args) {
  if (!args) {
    return;
  }

  let isUpdating = true;

  let bsArgs = args;

  if (!bsArgs.type) {
    throw new Error("No type was given! Please assign a valid Bootstrap class!");
  }
  if (!bsArgs.type.getOrCreateInstance) {
    throw new Error("Specified type is not a valid Bootstrap class!");
  }

  const obj = new bsArgs.type(node, bsArgs.config);
  bsArgs.mount && bsArgs.mount(obj);

  tick().then(() => isUpdating = false);

  return {
    update(newArgs) {
      if (isUpdating) {
        return;
      }

      isUpdating = true;

      bsArgs = newArgs;
      bsArgs.update && bsArgs.update(obj);

      tick().then(() => isUpdating = false);
    },
    destroy() {
      bsArgs.destroy && bsArgs.destroy(obj);
      obj.dispose();
    }
  };
}

export default bootstrapjs;