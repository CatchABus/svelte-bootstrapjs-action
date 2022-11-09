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

  let isMounted = false;

  let bsArgs = args;

  let obj = createBsInstance(node, bsArgs);
  bsArgs.mount && bsArgs.mount(obj);

  tick().then(() => isMounted = true);

  return {
    update(newArgs) {
      if (!isMounted) {
        return;
      }

      bsArgs = newArgs;
      if (bsArgs) {
        obj = createBsInstance(node, bsArgs);
      } else {
        if (obj) {
          obj.dispose();
          obj = null;
        }
      }
    },
    destroy() {
      bsArgs.destroy && bsArgs.destroy(obj);
      obj.dispose();
      obj = null;
    }
  };
}

export default bootstrapjs;