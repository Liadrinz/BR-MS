# Modules that you may use by require("module").
# -- MODIFY HERE --
# modules on npm
npm_modules = [
    "verify-identity-card",
    "jquery",
    "dateformat",
    "element-china-area-data"
]

# modules written in mods directory.
# Remember to require with prefix "/mods/"
local_modules = [    
    "roles",
    "backend"
]

# Build scripts, DO NOT MODIFY
uglifyJs = " | uglifyjs -m toplevel,eval -c toplevel -o ./BR-MS/res/dependencies.js"

import os
requires = ["-r "+x for x in npm_modules] + ["-r ./mods/"+x for x in local_modules]
os.system(r"browserify " +
                " ".join(requires) +
                r" -t [babelify --presets env --plugins add-module-exports]"
                + uglifyJs)
