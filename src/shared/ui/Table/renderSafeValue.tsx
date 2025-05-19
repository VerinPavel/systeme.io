const renderSafeValue = (value: any) => {
  if (value === null || value === undefined) return '';

  if (typeof value === 'boolean') {
    return value.toString();
  }

  if (typeof value === 'object') {
    return (
      <div className="whitespace-pre-line">
        {Object.entries(value)
          .map(([key, val]) => `${key}: ${val}`)
          .join('\n')}
      </div>
    );
  }

  return String(value);
};

export { renderSafeValue };
