# Modules that you may use by require('module').
# -- MODIFY HERE --
# modules on npm
npm_modules = [
    "verify-identity-card",
]

# modules written in mods directory
local_modules = [    
    "first-module"
]

# Build scripts, DO NOT MODIFY
import os
requires = ['-r '+x for x in npm_modules] + ['-r ./mods/'+x for x in local_modules]
os.system(r'cmd /c browserify ' +
                ' '.join(requires) +
                r' -t [babelify --presets env] | uglifyjs -m toplevel -o .\BR-MS\res\dependencies.js')