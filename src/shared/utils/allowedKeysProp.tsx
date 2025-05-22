const getAllowedKeysProp = (keys: unknown) => {
  return Array.isArray(keys) && keys.length > 0 ? { allowedKeys: keys } : {};
};

export { getAllowedKeysProp };
