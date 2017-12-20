export default function (server, adminCluster, dataCluster) {

	//GET cluster health
    server.route({
    	path: '/api/xlxs_import/health',
        method: 'GET',
        handler(req, reply) {
        	dataCluster.callWithRequest(req, 'cluster.health')
        	.then(function (response) {
        		reply(response);
    		});
    	}
    });	

	//Perform single POST for creating / adding document to an index
    server.route({
    	path: '/api/xlxs_import/{index}/{document}',
        method: 'POST',
        handler(req, reply) {
        	dataCluster.callWithRequest(req, 'index', {
        		index: req.params.index,
        		type: req.params.document,
        		body: req.payload
        	})
        	.then(function (err, response) {
        		if(err)
        			reply(err);
        		else
        			reply(response);
    		});
    	}
    });	

    //Perform BULK for creating / adding multiple documents to an index
    server.route({
    	path: '/api/xlxs_import/{index}/{document}/_bulk',
        method: 'POST',
        handler(req, reply) {

        	dataCluster.callWithRequest(req, 'bulk', {
        		body: req.payload
        	})
        	.then(function (err, response) {
        		if(err)
        			reply(err);
        		else
        			reply(response);
    		});
    	}
    });	

    //Create a mapping for a selected index and document
    server.route({
        path: '/api/xlxs_import/{index}/_mapping/{document}',
        method: 'POST',
        handler(req, reply) {
            dataCluster.callWithRequest(req, 'indices.putMapping', {
                body: req.payload
            })
            .then(function (err, response) {
                if(err)
                    reply(err);
                else
                    reply(response);
            });
        }
    });

}
