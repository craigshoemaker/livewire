const rules = [];
let facets = {};

const flatten = (obj) => {
  const val = {};
  for (let prop in obj) {
    if (obj[prop]["_"]) {
      val[prop] = obj[prop]["_"];
    } else {
      val[prop] = obj[prop];
    }
  }
  return val;
};
rules.push(flatten);

const deserializeArray = (obj) => {
  for (let prop in obj) {
    if (typeof obj[prop] === "string") {
      if (/\[.*\]/.test(obj[prop])) {
        obj[prop] = JSON.parse(obj[prop]);

        let lowerCasePropName = prop.toLowerCase();

        if (!facets[lowerCasePropName]) {
          facets[lowerCasePropName] = [];
        }

        facets[lowerCasePropName] = Array.from(
          new Set([...obj[prop], ...facets[lowerCasePropName]])
        );

        facets[lowerCasePropName] = facets[lowerCasePropName].sort((a, b) => {
          return a.localeCompare(b);
        });
      }
    }
  }
  return obj;
};
rules.push(deserializeArray);

const _module = {
  init: () => (facets = {}),

  adapt: (record) => {
    let value = { ...record };
    rules.forEach((rule) => {
      value = rule(value);
    });
    return value;
  },
  facets: () => facets,
};

module.exports = _module;
