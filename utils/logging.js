const endpointLog = (endpoint, method) => {
   return console.log(`   [*](${method}) Fired ${endpoint} endpoint.`);
};

module.exports = endpointLog;