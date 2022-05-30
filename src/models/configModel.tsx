import PostModel from "./post";

type ConfigModel = {
  url: string,
  method?: string,
  data?: PostModel
};

export default ConfigModel;