const QRCode = require('qrcode');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const name = (req.query.name || (req.body && req.body.name));
    
    const responseMessage = name
        ? "Vaccine Credential Function App, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";
    
    var shc = req.body;
    var shcByteIndex = shc.lastIndexOf('/');

    var shcByte = shc.substring(0,shcByteIndex+1);
    var shcNumeric = shc.substring(shcByteIndex+1);

    var segs = [
        { data: shcByte, mode: 'byte' },
        { data: shcNumeric, mode: 'numeric' }
    ]
    
    code = await QRCode.toDataURL(segs,{errorCorrectionLevel: 'L'});

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: code
    };
}