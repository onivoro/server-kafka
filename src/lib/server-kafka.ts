import { Kafka } from 'kafkajs';

export async function serverKafka(options: { brokers: string[], clientId: string, eachMessage: any, fromBeginning: boolean, groupId: string, topic: string }) {
  const { brokers, clientId, eachMessage, fromBeginning, groupId, topic } = options;
  const kafka = new Kafka({ clientId, brokers });
  const consumer = kafka.consumer({ groupId });
  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning });

  await consumer.run({ eachMessage });
}
