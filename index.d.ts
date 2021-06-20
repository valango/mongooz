declare module 'mongooz' {
  import {Connection, Model, Query, Schema} from 'mongoose';

  interface serviceType {
    dbName: string;
    dbURI?: string;
  }

  interface responseType {
    json (data: Object): responseType
  }

  type Translator = (error: Error) => Object

  // Creates a new mongoose connection and returns a promise to it.
  export function connect (service: serviceType | string, options?: Object): Promise<Connection>;

  // Creates a spatial schema of `typeName` type with '2dsphere' index.
  export function createGeoSchema (typeName: string): Schema;

  // Creates a model and returns it.
  export function createModel (name: string, schema: Schema | Object, connection: Connection): Model<any>;

  // Creates a schema and returns it. This wrapper function around the native Schema constructor supports
  // a simplified schema definition suitable for JSON presentation.
  export function createSchema (definition: Object, options?: Object): Schema

  // Waits for query lean() results and sends `data` or `error` via response.json().
  export function queryJSON (query: Query<any, any>, response: responseType, translate?: Translator): void

  // Waits for the promise and sends `data` or `error` via response.json().
  export function postJSON (promise: Promise<any>, response: responseType, translate?: Translator): void

  // Updates a record or inserts a new one.
  export function saveOne (model: Model<any>, data: Object): Promise<Object>;

  // Waits until indexes of all or specified models are built.
  export function syncIndexes (db: Connection, ...model: Model<any>[] | string[]): Promise<any[]>;
}
