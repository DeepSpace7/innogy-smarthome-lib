function getPropertyValue(container: Container<Property>, propertyName: string) {
  if (container) {
    for (var i = container.length - 1; i >= 0; i--) {
      const item = container[i];
      
      if (item.name === propertyName) {
        return item.value;
      }
    }
  }

  return undefined;
}