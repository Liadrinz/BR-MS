# Modules that you may use by require('module').
# -- MODIFY HERE --
# modules on npm
npm_modules = [
    "verify-identity-card",
    "jquery",
    "axios",
    "es6-promise"
]

# modules written in mods directory.
# Remember to require with prefix '/mods/'
local_modules = [    
    "roles",
    'backend',
    'easyAjax',
]

# Build scripts, DO NOT MODIFY
import os
requires = ['-r '+x for x in npm_modules] + ['-r ./mods/'+x for x in local_modules]
os.system(r'browserify ' +
                ' '.join(requires) +
                r' -t [babelify --presets env --plugins add-module-exports] | uglifyjs -m toplevel -o ./BR-MS/res/dependencies.js')
