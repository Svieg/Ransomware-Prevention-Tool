// TODO: Hook RegCreateKeyExA, RegCreateKeyExW, RegSetValueExW, RegSetValueExA etc.
this.registry_apis = [
  "RegCreateKeyExA", "RegCreateKeyExW", "RegSetValueExW", "RegSetValueExA",
  "RegDeleteKeyExA", "RegDeleteKeyExW", "RegDeleteValueA", "RegDeleteValueW",
  "RegEnumKeyExA", "RegEnumKeyExW", "RegOpenKeyExA", "RegOpenKeyExW",
  "RegQueryInfoKeyA", "RegQueryInfoKeyW"
];

function findImportByAddr(addr) {
  var i;
  for (i = 0; i < this.imports.length; i++) {
    if (addr < this.imports[i].addr && addr > this.imports[i + i] > addr) {
      return this.imports[i].name;
    }
  }
}

rpc.exports.enumerateModules = function () {
  //TODO: change to enumerateImports
  var modules = Process.enumerateModules();
  this.imports = [];
  var i, j;
  for (i = 0; i < modules.length; i++) {
    var exports = modules[i].enumerateExports();
    for (j = 0; j < exports.length; j++) {
      this.imports.push(exports[j]);
    }

  }
  return this.imports;
};
var i;

{% for function_name in function_names %}
Interceptor.attach(Module.getExportByName("kernel32.dll", "{{ function_name }}"), {
  onEnter(args) {
    send("{{ function_name }}:" + Process.id.toString());
  },
});
{% endfor %}