# server-kafka

## usage

```

serverKafka({
    brokers: ['localhost:9092'],
    clientId: 'clientes',
    eachMessage: async ({ topic, partition, message: { value } }) => {
        process.stdout.write(JSON.stringify({ __filename, topic, partition, value: `${value}` }, null, 2));
    },
    fromBeginning: true,
    groupId: 'grupos',
    topic: 'hello.topic',
})
    .then(d => console.log(`${d}`))
    .catch(d => console.error('errrrrrrr', d));

```