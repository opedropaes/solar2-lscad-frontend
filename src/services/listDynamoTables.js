const listTables = async (AWSClient) => {

	const dynamodb = new AWSClient.DynamoDB();
	const params = {};

	return new Promise((resolve, reject) => {
		dynamodb.listTables(params, (err, data) => {
			if (err) {
				console.info(`Error on list tables.`);
				reject(err.stack);
			} else {
				const { TableNames } = data;
				resolve(TableNames);
			}
		});
	})
}

export default listTables;

/* response-type:
	  data = {
	   TableNames: [
		  "Forum",
		  "ProductCatalog",
		  "Reply",
		  "Thread"
	   ]
	  }
*/
