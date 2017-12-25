/**
 * Created by mercuso on 22.12.17.
 */
function checkForExistence(arr) {
  arr.some(name=>{
    if(!process.env[name]){
      throw new Error (`missing ${name} environment variable`);
    }
  });
}

module.exports = {checkForExistence};