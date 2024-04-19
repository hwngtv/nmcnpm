// Function to report web vitals, taking a callback function 'onPerfEntry' as a parameter
const reportWebVitals = onPerfEntry => {
  
  // Check if 'onPerfEntry' is a function before proceeding
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Dynamically import the 'web-vitals' module and execute functions to measure various performance metrics
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Measure Cumulative Layout Shift (CLS) and pass the data to 'onPerfEntry'
      getCLS(onPerfEntry);
      // Measure First Input Delay (FID) and pass the data to 'onPerfEntry'
      getFID(onPerfEntry);
      // Measure First Contentful Paint (FCP) and pass the data to 'onPerfEntry'
      getFCP(onPerfEntry);
       // Measure Largest Contentful Paint (LCP) and pass the data to 'onPerfEntry'
      getLCP(onPerfEntry);
      // Measure Time to First Byte (TTFB) and pass the data to 'onPerfEntry'
      getTTFB(onPerfEntry);
    });
  }
};

// Export the 'reportWebVitals' function as the default export
export default reportWebVitals;
////////////////////////////////