# Database Configuration Harmonization - SmartMoons v3.3.x

## Summary
Successfully harmonized database configuration loading across all database-related classes to use a single, consistent structure.

## Problem Analysis
The system had remnants of old configuration structures:
- Old versions used `$database` array with keys: `userpw`, `databasename`
- New versions use `$databaseConfig` array with keys: `password`, `dbname`
- SQLDumper.class.php had merge conflict markers and duplicate `require_once` statements

## Changes Made

### 1. SQLDumper.class.php
**Fixed Issues:**
- Removed merge conflict marker (`=======`) on line 52
- Removed duplicate `require_once 'includes/config.php'` statements in 3 locations:
  - `nativeDumpToFile()` method (line 53)
  - `softwareDumpToFile()` method (line 86)
  - `restoreDatabase()` method (line 244)

**Configuration Loading Pattern (now consistent):**
```php
$databaseConfig = array();
$configPath = 'includes/config.php';
if (!file_exists($configPath)) {
    throw new Exception("Database configuration file not found: $configPath. Cannot perform database dump.");
}
require_once $configPath;
```

### 2. Verified Harmonization Across All Database Classes

#### Database.class.php (PDO-based)
✅ **Correct Configuration Keys:**
- `$databaseConfig['host']` - Database host
- `$databaseConfig['port']` - Database port (default: 3306)
- `$databaseConfig['user']` - Database username
- `$databaseConfig['password']` - Database password
- `$databaseConfig['dbname']` - Database name
- `$databaseConfig['prefix']` - Table prefix

✅ **Character Set:** UTF8MB4 via DSN and PDO::MYSQL_ATTR_INIT_COMMAND
✅ **SQL Mode:** STRICT_ALL_TABLES

#### Database_BC.class.php (mysqli-based, backward compatibility)
✅ **Correct Configuration Keys:**
- `$databaseConfig['host']` - Database host
- `$databaseConfig['port']` - Database port (default: 3306)
- `$databaseConfig['user']` - Database username
- `$databaseConfig['password']` - Database password
- `$databaseConfig['dbname']` - Database name

✅ **Character Set:** UTF8MB4 via `set_charset("utf8mb4")`
✅ **SQL Mode:** STRICT_ALL_TABLES

#### config.sample.php
✅ **Template Structure:**
```php
$databaseConfig = array();
$databaseConfig['host']     = '%s';  // Database host
$databaseConfig['port']     = %s;    // Database port
$databaseConfig['user']     = '%s';  // Database username
$databaseConfig['password'] = '%s';  // Database password
$databaseConfig['dbname']   = '%s';  // Database name
$databaseConfig['prefix']   = '%s';  // Table prefix
$salt                       = '%s';  // 22 digits
```

## Unified Configuration Standard

All database-related classes now use **one single array** (`$databaseConfig`) with standardized keys:

| Key | Description | Required | Default |
|-----|-------------|----------|---------|
| `host` | Database host (e.g., 'localhost') | Yes | - |
| `port` | Database port | No | 3306 |
| `user` | Database username | Yes | - |
| `password` | Database password | Yes* | - |
| `dbname` | Database name | Yes | - |
| `prefix` | Table prefix | No | '' |

*Password must exist in config but can be empty string.

## Database Connection Standards

### Character Encoding
All connections use **UTF8MB4** for proper Unicode support (including emojis and special characters).

### SQL Mode
All connections use **STRICT_ALL_TABLES** for:
- Better data integrity
- Stricter type checking
- Prevention of invalid data insertion

## Files Modified
1. `includes/classes/SQLDumper.class.php` - Fixed merge conflicts and duplicate requires

## Files Verified (Already Correct)
1. `includes/classes/Database.class.php` - PDO-based database class
2. `includes/classes/Database_BC.class.php` - mysqli-based backward compatibility class
3. `includes/config.sample.php` - Configuration template

## Installation Verification
The installer (`install/index.php`) correctly creates `config.php` with the unified structure:
```php
file_put_contents(
    ROOT_PATH . 'includes/config.php', 
    sprintf(
        file_get_contents('includes/config.sample.php'), 
        $host, $port, $user, $password, $dbname, $prefix, $blowfish
    )
);
```

## Error Messages Harmonization
All database classes now provide consistent, helpful error messages:
- "Database configuration file not found: {path}. Please copy includes/config.sample.php to includes/config.php..."
- "Database configuration error: \$databaseConfig is not properly defined..."
- "Database configuration error: '{key}' is missing or empty. Please check includes/config.php"

## Testing Recommendations
1. Fresh installation should create correct `config.php` with all required keys
2. `admin.php` should load without database configuration errors
3. Database dump/restore operations should work correctly
4. Both PDO and mysqli database classes should work with same config

## Migration Notes
**No migration needed** - The codebase was already using the correct structure. This fix only:
- Removed merge conflict artifacts
- Eliminated duplicate configuration loading
- Ensured consistency across all files

## Compatibility
- PHP 8.0+
- MySQL 5.5+
- Both PDO and mysqli extensions supported

---
**Status:** ✅ Complete
**Version:** SmartMoons v3.3.x
**Date:** 2025-10-02
