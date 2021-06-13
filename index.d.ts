declare module 'mongooz' {
  import {Connection, Model, Schema} from 'mongoose';

  interface serviceType {
    dbName: string;
    dbURI?: string;
  }

  // Creates a new mongoose connection and returns a promise to it.
  export function connect (service: serviceType | string, options?: Object): Promise<Connection>;

  // Close the database, if connected; waits for all indexes being built.
  export function close (db: Connection, noWait?: boolean): Promise<true>;

  // Creates a spatial schema of `typeName` type with '2dsphere' index.
  export function createGeoSchema (typeName: string): Schema;

  // Creates a model and returns it.
  export function createModel (name: string, schema: Schema | Object, connection: Connection): Model<any>;

  // Creates a schema and returns it. This wrapper function around the native Schema constructor supports
  // a simplified schema definition suitable for JSON presentation.
  export function createSchema (definition: Object, options?: Object): Schema
}
