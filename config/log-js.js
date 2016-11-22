var moment = require("moment");


/**
 * Fonction de log Debug
 * @param Object req Requete Express
 * @param String message Message à logguer
 */
exports.debug = function(message)
{
  console.log(moment().format("YYYY-MM-DD HH:mm:ss")+" [DEBUG] "+message.toString());
}

/**
 * Fonction de log Error
 * @param Object req Requete Express
 * @param String message Message à logguer
 */
exports.error = function(message)
{
  console.log(moment().format("YYYY-MM-DD HH:mm:ss")+" [ERROR] "+message.toString());
}
