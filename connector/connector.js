function getConfig(request) {
    var config = {
        configParams: [
            {
                name: 'cid',
                displayName: 'Colmeia ID',
                helpText: 'Enter the colmeia id.',
                placeholder: '1'
            }
        ]
    };
    return config;
}


var fixedSchema = [
    {
        name: 'city',
        label: 'City',
        description: 'The number of the city.',
        dataType: 'NUMBER',
        semantics: {

        }
    },
    {
        name: 'date',
        label: 'Date',
        description: 'The date of report',
        dataType: 'STRING',
        semantics: {

        }
    },
    {
        name: 'value',
        label: 'Value',
        description: 'The value of report',
        dataType: 'NUMBER',
        semantics: {

        }
    }
];

function getSchema(request) {
    return {schema: fixedSchema};
}

function _debugData(d) {
    var options = {
        'method' : 'post',
        'contentType': 'application/json',
        'payload' : JSON.stringify(d)
    };
    UrlFetchApp.fetch('http://requestbin.fullcontact.com/1eswone1', options);
}

function getData(request) {

//    var request = {
//        configParams:{cid: 1}
//    }

    var url = [
        'https://a12bfb62.ngrok.io/?cid=',
        request.configParams.cid
    ];

    var response = UrlFetchApp.fetch(url.join(''));
    var forecast = JSON.parse(JSON.parse(response.getContentText()));
    var data = [];
    var dataSchema = [];

    request.fields.forEach(function(_field) {
        for(var i = 0; i <= fixedSchema.length; i++) {
            if(_field.name === fixedSchema[i].name) {
                dataSchema.push(fixedSchema[i]);
                break;
            }
        }
    })

    forecast.result.forEach(function(f) {

        var values = [];

        dataSchema.forEach(function(_schema) {
            values.push(f[_schema.name]);
        })

        data.push({
            values: values
        })

    });


    var ret = {
        schema: dataSchema,
        rows: data
    };

    _debugData(ret)


    return ret;
}

function getAuthType() {
    var response = {
        "type": "NONE"
    };
    return response;
}