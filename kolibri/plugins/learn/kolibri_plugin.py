from __future__ import absolute_import
from __future__ import print_function
from __future__ import unicode_literals

from . import hooks
from kolibri.core.webpack import hooks as webpack_hooks
from kolibri.plugins.base import KolibriPluginBase


class LearnPlugin(KolibriPluginBase):
    def url_module(self):
        from . import urls
        return urls

    def url_slug(self):
        return "^learn/"


class LearnAsset(webpack_hooks.WebpackBundleHook):
    unique_slug = "learn_module"
    src_file = "assets/src/app.js"


class LearnInclusionHook(hooks.LearnSyncHook):
    bundle_class = LearnAsset
