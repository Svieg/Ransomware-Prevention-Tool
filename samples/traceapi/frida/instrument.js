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

// TODO: template
Interceptor.attach(Module.getExportByName("kernel32.dll", "RegCreateKeyExA"), {
  onEnter(args) {
    send("RegCreateKeyExA:" + Process.id.toString());
  },
});
Interceptor.attach(Module.getExportByName("kernel32.dll", "RegCreateKeyExW"), {
  onEnter(args) {
    send("RegCreateKeyExW:" + Process.id.toString());
  },
});
Interceptor.attach(Module.getExportByName("kernel32.dll", "RegSetValueExW"), {
  onEnter(args) {
    send("RegSetValueExW:" + Process.id.toString());
  },
});
Interceptor.attach(Module.getExportByName("kernel32.dll", "RegSetValueExA"), {
  onEnter(args) {
    send("RegSetValueExA:" + Process.id.toString());
  },
});
Interceptor.attach(Module.getExportByName("kernel32.dll", "RegOpenKeyExA"), {
  onEnter(args) {
    send("RegOpenKeyExA:" + Process.id.toString());
  },
});
Interceptor.attach(Module.getExportByName("kernel32.dll", "RegOpenKeyExA"), {
  onEnter(args) {
    send("RegOpenKeyExA:" + Process.id.toString());
  },
});
Interceptor.attach(Module.getExportByName("kernel32.dll", "RegQueryInfoKeyA"), {
  onEnter(args) {
    send("RegQueryInfoKeyA:" + Process.id.toString());
  },
});
Interceptor.attach(Module.getExportByName("kernel32.dll", "RegQueryInfoKeyA"), {
  onEnter(args) {
    send("RegQueryInfoKeyW:" + Process.id.toString());
  },
});
Interceptor.attach(Module.getExportByName("kernel32.dll", "RegCreateKeyExA"), {
  onEnter(args) {
    send("RegCreateKeyExA:" + Process.id.toString());
  },
});
Interceptor.attach(Module.getExportByName("kernel32.dll", "RegCreateKeyExA"), {
  onEnter(args) {
    send("RegCreateKeyExA:" + Process.id.toString());
  },
});
Interceptor.attach(Module.getExportByName("kernel32.dll", "RegCreateKeyExA"), {
  onEnter(args) {
    send("RegCreateKeyExA:" + Process.id.toString());
  },
});
Interceptor.attach(Module.getExportByName("kernel32.dll", "RegCreateKeyExA"), {
  onEnter(args) {
    send("RegCreateKeyExA:" + Process.id.toString());
  },
});
Interceptor.attach(Module.getExportByName("kernel32.dll", "RegCreateKeyExA"), {
  onEnter(args) {
    send("RegCreateKeyExA:" + Process.id.toString());
  },
});
Interceptor.attach(Module.getExportByName("kernel32.dll", "RegCreateKeyExA"), {
  onEnter(args) {
    send("RegCreateKeyExA:" + Process.id.toString());
  },
});