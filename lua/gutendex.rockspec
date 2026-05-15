package = "voxgig-sdk-gutendex"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/gutendex-sdk.git"
}
description = {
  summary = "Gutendex SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["gutendex_sdk"] = "gutendex_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
