"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Worker =
/*#__PURE__*/
function () {
  function Worker(name, surname, department) {
    _classCallCheck(this, Worker);

    this._name = name;
    this._surname = surname;
    this._department = department; // declare it starting with _, because setter doens't work without this symbol 
  }

  _createClass(Worker, [{
    key: "toString",
    value: function toString() {
      return "\u041C\u0435\u043D\u044F \u0437\u043E\u0432\u0443\u0442 ".concat(this._name, " ").concat(this._surname, ". \u042F - \u0440\u0430\u0431\u043E\u0447\u0438\u0439.");
    }
  }, {
    key: "department",
    set: function set(newDepartment) {
      this._department = newDepartment;
    },
    get: function get() {
      return this._department;
    }
  }]);

  return Worker;
}();

module.exports = Worker;
//# sourceMappingURL=worker-compiled.js.map
