// This is a simplified version without web-vitals dependency
const reportWebVitals = (onPerfEntry?: Function): void => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Web vitals reporting is disabled
    console.info('Web vitals reporting is disabled');
  }
};

export default reportWebVitals;