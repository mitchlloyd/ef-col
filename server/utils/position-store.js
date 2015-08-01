var db = {};

exports.write = function(id, position) {
  console.log(id + ' ' + position);
  db[id] = position;
};

exports.read = function(id) {
  return db[id];
}
