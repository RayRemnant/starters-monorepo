This is a basic API that can be hosted on Vercel as a serverless solution for interacting with MongoDB Atlas.

# UNFINISHED. Just use as reference.

# Setup

Fork the repo, clone, copy, whatever you prefer.

Add the project on Vercel.

Go to your account and add the MongoDB Atlas integration to this project.

Once you're done, a MONGODB_URI should appear in Vercel environment variables of this project.

# Requests

I suggest using Postman to test out the endpoints.

Every request expects a body with the following:

```
{
	"databaseName": "yourDatabaseName",
	"collectionName": "yourCollectionName"
}
```

You will have to create the database on MongoDB Atlas first.

As for the collection, if it does not exist, it will be created on the first document insertion.

## findOne / find

In addition to the previous request body, you will have to add the filter parameter.

```
{
	"filter": {
		"property": "value"
	}
}
```

## insertOne / insertMany

This time the `data` parameter is required, where the doc / docs to be inserted will be passed.

### insertOne

```
{
	"data": {
		"property": "value"
	}
}
```

This will **create a new document**.

### insertMany

```
{
	"data": [
		{
			"property": "value"
		},
		{
			"property": "value"
		},
		...
	]
}
```

This will **create new multiple document**.

## replaceOne

This is basically a mix of `find` and `insert`, thus requiring both the parameters mentioned beforehand.

```
{
	"filter": {
		"property": "value"
	},
	"data":{
		"property": "value"
	}
}
```

This will **replace the entire document** matching the `filter` parameter.

## updateOne / updateMany

Updates the document with the provided properties. If the properties are already present, they will be overwritten, otherwise a new property will be created.

Other unmentioned properties are unaffected by this method.

```
{
	"filter": {
		"property": "value"
	},
	"data":{
		"property": "value"
	}
}
```

This will **update or add the properties to the document** matching the `filter` parameter.
