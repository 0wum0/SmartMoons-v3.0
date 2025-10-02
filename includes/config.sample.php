<?php

declare(strict_types=1);

/**
 *  2Moons 
 *   by Jan-Otto Kröpke 2009-2016
 *
 * For the full copyright and license information, please view the LICENSE
 *
 * @package 2Moons
 * @author Jan-Otto Kröpke <slaver7@gmail.com>
 * @copyright 2009 Lucky
 * @copyright 2016 Jan-Otto Kröpke <slaver7@gmail.com>
 * @licence MIT
 * @version 1.8.0
 * @link https://github.com/jkroepke/2Moons
 */

//### Database access ###//
// IMPORTANT: This must be a plain PHP array, NOT a return statement
// The Database classes require all keys to be present

$databaseConfig				= array();
$databaseConfig['host']		= '%s';        // Database host (e.g., 'localhost' or IP address)
$databaseConfig['port']		= %s;          // Database port (default: 3306)
$databaseConfig['user']		= '%s';        // Database username
$databaseConfig['password']	= '%s';        // Database password (can be empty string '')
$databaseConfig['dbname']	= '%s';        // Database name
$databaseConfig['prefix']	= '%s';        // Table prefix (e.g., 'uni1_')
$salt						= '%s';        // 22 digits from the alphabet "./0-9A-Za-z"

//### Do not change beyond here ###//
?>