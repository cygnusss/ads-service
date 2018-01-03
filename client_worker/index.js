import AWS from 'aws-sdk'
import Promise from 'bluebird'
import Consumer from 'sqs-consumer'
import { region, accessKeyId, secretAccessKey, QueueUrl } from '../clientSQS.config'

AWS.config.update({ region, accessKeyId, secretAccessKey })