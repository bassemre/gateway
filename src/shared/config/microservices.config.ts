import { ClientsModuleOptions, Transport } from '@nestjs/microservices';

export default (): ClientsModuleOptions => [
  {
    name: 'REDIS',
    transport: Transport.REDIS,
    options: {
      host: 'localhost',
      port: 6379,
    },
  },
];
