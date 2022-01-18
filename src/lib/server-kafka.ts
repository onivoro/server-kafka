import { Kafka } from 'kafkajs';
import { CompressionCodecs, CompressionTypes } from 'kafkajs';
import LZ4Codec from 'kafkajs-lz4';

export async function serverKafka(options: { brokers: string[], clientId: string, eachMessage: any, fromBeginning: boolean, groupId: string, topic: string, lz4: boolean, createProducer: boolean}) {
  if (options.lz4) CompressionCodecs[CompressionTypes.LZ4] = new LZ4Codec().codec;
  const { brokers, clientId, eachMessage, fromBeginning, groupId, topic } = options;
  const kafka = new Kafka({ clientId, brokers });
  const consumer = kafka.consumer({ groupId });
  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning });

  await consumer.run({ eachMessage });
  return options.createProducer ? {consumer, kafka, producer: kafka.producer()} : {consumer, kafka}
}
