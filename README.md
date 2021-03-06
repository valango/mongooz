# mongooz
Simple [mongoose](https://mongoosejs.com) helpers, that:
   * provide connection settings reasonable for most use cases;
   * ensure all new indexes are created before closing a connection;
   * simplify use of spatial functionality;
   * supports fully streamable schema definition syntax;
   * allow you to write more compact code.

Note: this is code is used in my private projects, but I am happy to share and
to receive any contributions and feedback.

## Installation

`$ yarn add git://github.com/valango/mongooz.git`

or

`$ npm i -S git://github.com/valango/mongooz.git`.

## API
The module exports the mongoose [native Schema](https://mongoosejs.com/docs/api/schema.html)
and the functions described below.

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
   * `definition.$index` optional array of objects will be applied to `schema.index()`.
   * a field `type` attribute (or whole value) can also be a string of ('boolean', 'date', 'number', 'string');
   * for a field named 'geometry', the _`createGeoSchema()`_ is applied;
   * all occurrences of `index: true` are turned into `index: {background: false}`.

**_definition_** `: Object`

**_options_** `: Object` <br>
As described in [Mongoose docs](https://mongoosejs.com/docs/api/schema.html#schema_Schema).

NB: array types are supported, but only unstructured ones, e.g.:<br>
`field: [[number]]` - ok;<br>
`field: [{type: number}]` - will not be translated.

### findBounded(model, fields, bounds, [geometryField]) : Query
Creates a spatial intersect query. Needs at least two coordinate pairs.

**_model_** `: Promise<any>`

**_fields_** `: Object` - `find()` conditions.

**_bounds_** `: number[][]` - polygon points (a closing one will be added if not there).

**_geometryField_** `: string` - return value will go to `.json()`.

### getTotals(records): Object
Sums up all numeric fields from array of data records.

**_records_** `: Array<Object>`

### postJSON(promise, response, [fieldNames], [translate])
Waits for query `.lean()` results and sends `data` or `error` via `response.json()`.

**_promise_** `: Promise<any>`

**_response_** `: Object` - like one from express.js framework.

**_fieldNames_** `: string | string[]` - space-delimited name(s) of fields to return (all by default).

**_translate_** `: function(Error):Object` - return value will go to `.json()`.

### postQuery(query, response, [translate])
Waits for query `.lean()` results and sends `data` or `error` via `response.json()`.

**_query_** `: Query<any,any>`

**_response_** `: Object` - like one from express.js framework.

**_translate_** `: function(Error):Object` - return value will go to `.json()`.

### saveOne(model, data) : Promise\<Object>
Updates a record or inserts a new one, returning the data record.

**_model_** `: Model`

**_data_** `: Object` will be inspected for `_id` property.

### syncIndexes(connection, [...model]) : Promise\<*[]>
Waits until indexes of all or specified models are built.

**_connection_** `: Connection`

**_model_** `: Model | string` - explicitly say which models to check for.

## Links

* https://mongodb.github.io/node-mongodb-native/3.6/api
