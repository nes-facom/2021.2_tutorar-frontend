import store from "@/store";

export type resources = "tutorias";

interface Options {
  forceLoad?: boolean;
}

export default (resources: resources[], options?: Options) => {
  resources.forEach(resource => {
    if (!options?.forceLoad) {
      const isResourceLoaded =
        Object.values(store.state[resource].items).length > 0;

      if (!isResourceLoaded) store.dispatch(resource + "/fetch");
    }
  });
};
