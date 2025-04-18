import logger from "./Logger.js";
const asyncHandler = (asyncFunction) => {
    return async (req, res, next) => {
      try {
        await asyncFunction(req, res, next);
      } catch (err) {
        logger.error(err);
      }
    };
  };
  
  export default asyncHandler;
  