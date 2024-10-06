import { createClient } from 'redis';

const client = createClient();

client.on('error', (err) => {
  console.error('Redis Client Error:', err);
});

// Immediately connect the client when this module is imported
(async () => {
  try {
    await client.connect();
    console.log('Connected to Redis');
  } catch (err) {
    console.error('Could not connect to Redis:', err);
  }
})();

const setTestData = async (key, test) => {
  try {
    if (client.isOpen) { // Check if the client is connected
      await client.set(key, test); 
      await client.expire(key,3600) // Set key with 10 seconds TTL
      console.log('Successfully set the testData');
    } else {
      console.error('Redis client is not connected');
    }
  } catch (error) {
    console.error('Error setting testData:', error);
  }
}

const getTestData = async (key) => {
  try {
    if (client.isOpen) { // Check if the client is connected
      const testData = await client.get(key);
      return testData;
    } else {
      console.error('Redis client is not connected');
      return null; // Return null if not connected
    }
  } catch (error) {
    console.error('Error getting testData:', error);
    return null; // Return null in case of error
  }
}

// Disconnect the Redis client
process.on('SIGINT', async () => {
  console.log('Disconnecting Redis client...');
  await client.quit(); // Gracefully disconnects the Redis client
  console.log('Redis client disconnected. Exiting...');
  process.exit(0); // Exit the process
});

// Export the functions
export { setTestData, getTestData };
