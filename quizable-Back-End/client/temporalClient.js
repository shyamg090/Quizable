import { Client, Connection } from '@temporalio/client';
// Connect to the default Server location
const connection = await Connection.connect({ address: 'localhost:7233' });
// In production, pass options to configure TLS and other settings:
// {
//   address: 'foo.bar.tmprl.cloud',
//   tls: {}
// }

export const client = new Client({
    connection,
    namespace: 'default', // connects to 'default' namespace if not specified
});
