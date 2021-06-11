# mongooz
Simple [mongoose](https://mongoosejs.com) helpers.

Note: this is code is used in my private projects, but I am happy to share and
to receive any contributions and feedback. Heck, there's even no tests yet,

## Installation

`$ yarn add git://github.com/valango/mongooz.git`

or

`$ npm i -S git://github.com/valango/mongooz.git`.

## API
The module exports the functions described below.

### connect(service, [connectOptions], [errorHandler]) : Promise\<Connection\>
Creates a new mongoose connection and returns a promise to it.

**_service_** `: string | {[dbName]: string, [dbURI]: string}` <br>
A service URI to use.
If `dbName` is not URI string, it will be appended to `dbURI`.

**_connectOptions_** `: ConnectOptions` <br>
As described in [Mongoose docs](https://mongoosejs.com/docs/api/mongoose.html#mongoose_Mongoose-createConnection).
The defaults are: <br>
`autoIndex: false` <br>
`keepAlive: true` <br>
`keepAliveInitialDelay: 300000` <br>
`useCreateIndex: true` <br>
`useNewUrlParser: true` <br>
`useUnifiedTopology: true`

**_errorHandler_** `: function(err:Error):*` <br>
The `'error'` event handler. In non-production environment, it defaults
to `console.error()`.

### createGeoSchema(typeName) : Schema
Creates a spatial schema of `typeName` type with '2dsphere' index.

**_typeName_** `: string`<br>
one of ('LineString', 'MultiLineString', 'Point', 'Polygon').

### createModel(name, schema, connection) : Model
Creates a model and returns it.

**_name_** `: string` <br>
The name for both the model and collection (will not be pluralized).

**_schema_** `: Schema | Object`

**_connection_** `: Connection`

### createSchema(definition, [options]) : Schema
Creates a schema and returns it. This wrapper function around the native Schema constructor supports
a simplified schema definition suitable for JSON presentation:
   * a field `type` attribute (or whole value) can also be a string of ('boolean', 'date', 'number', 'string');
   * for a field named 'geometry', the _`createGeoSchema()`_ is applied;
   * all occurrences of `index: true` are turned into `index: {background: false}`.

**_definition_** `: Object`

**_options_** `: Object` <br>
As described in [Mongoose docs](https://mongoosejs.com/docs/api/schema.html#schema_Schema).

## Links

* https://mongodb.github.io/node-mongodb-native/3.6/api
