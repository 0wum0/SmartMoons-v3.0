<?php
// ONE-TIME USE: clear OPcache so updated files take effect. DELETE after use.
if (function_exists('opcache_reset')) {
    opcache_reset();
    echo 'OPcache cleared.';
} else {
    echo 'OPcache not active or not available.';
}
