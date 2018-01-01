import { sendMessage } from './index'

let i = 0; do {
  sendMessage({ name: 'David' + String.fromCharCode(128 << i) })
    .then(() => console.log('message sent'))
  ++i
} while (i < 12)