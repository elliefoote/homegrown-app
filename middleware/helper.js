function makePatchSQL(body, sellerid) {
    // Create an empty array to store all assignments
    let parts = [];
    console.log("body", body);
    // Check each of the possible properties
    // if ('picurl' in body) {
    //     parts.push( `picurl = '${body['picurl']}'` );
    // }
    // if ('coverurl' in body) {
    //     parts.push( `coverurl = '${body['coverurl']}'` );
    // }
    if ('shopname' in body) {
        parts.push( `shopname = '${body['shopname']}'` );
    }
    if ('description' in body) {
        parts.push( `description = '${body['description']}'` );
    }

    // Combine everything into an SQL statement
    let sql = 'UPDATE sellers SET ';
    sql += parts.join(', ');
    sql += ` WHERE sellerid = ${sellerid}`;
    console.log("sql", sql);
    return sql; 
}

module.exports = {
    makePatchSQL 
}