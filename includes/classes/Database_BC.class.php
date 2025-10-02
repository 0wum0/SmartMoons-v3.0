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
 
class Database_BC extends mysqli
{
	protected $exception;

    private $queryCount = 0;

	/**
	 * Constructor: Set database access data.
	 *
	 * @param string	The database host
	 * @param string	The database username
	 * @param string	The database password
	 * @param string	The database name
	 * @param integer	The database port
	 *
	 * @return void
	 */
	public function __construct()
	{
		// Determine config path - always use absolute path
		$configPath = defined('ROOT_PATH') 
			? ROOT_PATH . 'includes/config.php'
			: __DIR__ . '/../../includes/config.php';
		
		// Check if config file exists
		if (!file_exists($configPath)) {
			throw new Exception("Database configuration file not found: $configPath. Please copy includes/config.sample.php to includes/config.php and configure your database settings.");
		}
    
		// CRITICAL: Load database configuration from config.php
		// This MUST be done before any validation to ensure $databaseConfig is available
		require_once $configPath;

		// Validate that $databaseConfig (or alternative $database) exists and is an array
		if (!isset($databaseConfig) && !isset($database)) {
			throw new Exception("Database configuration error: \$databaseConfig is not properly defined in includes/config.php. It must be an array with host, user, password, and dbname keys.");
		}
		
		// Support alternative variable name $database
		if (!isset($databaseConfig) && isset($database)) {
			$databaseConfig = $database;
		}
		
		if (!is_array($databaseConfig)) {
			throw new Exception("Database configuration error: \$databaseConfig is not properly defined in includes/config.php. It must be an array with host, user, password, and dbname keys.");
		}

		// Normalize alternative key names to standard ones
		// Support 'userpw' as alternative to 'password'
		if (!isset($databaseConfig['password']) && isset($databaseConfig['userpw'])) {
			$databaseConfig['password'] = $databaseConfig['userpw'];
		}
		
		// Support 'databasename' as alternative to 'dbname'
		if (!isset($databaseConfig['dbname']) && isset($databaseConfig['databasename'])) {
			$databaseConfig['dbname'] = $databaseConfig['databasename'];
		}

		// Validate required database configuration keys
		$requiredKeys = ['host', 'user', 'password', 'dbname'];
		$missingKeys = [];
		foreach ($requiredKeys as $key) {
			if (!array_key_exists($key, $databaseConfig)) {
				$missingKeys[] = $key;
			}
		}
		
		if (!empty($missingKeys)) {
			throw new Exception("Database configuration error: \$databaseConfig is not properly defined in includes/config.php. Missing keys: " . implode(', ', $missingKeys));
		}

		// Validate that required values are not empty (except password which can be empty)
		if (empty($databaseConfig['host'])) {
			throw new Exception("Database configuration error: 'host' is empty. Please check includes/config.php");
		}
		if (empty($databaseConfig['user'])) {
			throw new Exception("Database configuration error: 'user' is empty. Please check includes/config.php");
		}
		if (empty($databaseConfig['dbname'])) {
			throw new Exception("Database configuration error: 'dbname' is empty. Please check includes/config.php");
		}

		// Set default port if not specified
		if (!isset($databaseConfig['port']) || empty($databaseConfig['port'])) {
			$databaseConfig['port'] = 3306;
		}

		// Establish database connection
		@parent::__construct(
			$databaseConfig['host'], 
			$databaseConfig['user'], 
			$databaseConfig['password'], 
			$databaseConfig['dbname'], 
			(int)$databaseConfig['port']
		);

		// Check for connection errors
		if (mysqli_connect_error()) {
			throw new Exception("Connection to database failed: " . mysqli_connect_error());
		}
		
		// Set charset to utf8mb4 for full Unicode support (including emojis)
		parent::set_charset("utf8mb4");
		
		// Set strict SQL mode for better data integrity
		parent::query("SET SESSION sql_mode = 'STRICT_ALL_TABLES';");
	}

	/**
	 * Performs a query on the database
	 * Performs a `query` against the database.
	 *
	 * @param string $query The query string.
	 * @param int|null $result_mode The result mode can be one of 3 constants indicating how the result will be returned from the MySQL server. `MYSQLI_STORE_RESULT` (default) - returns a mysqli_result object with buffered result set. `MYSQLI_USE_RESULT` - returns a mysqli_result object with unbuffered result set. As long as there are pending records waiting to be fetched, the connection line will be busy and all subsequent calls will return error `Commands out of sync`. To avoid the error all records must be fetched from the server or the result set must be discarded by calling mysqli_free_result(). `MYSQLI_ASYNC` (available with mysqlnd) - the query is performed asynchronously and no result set is immediately returned. mysqli_poll() is then used to get results from such queries. Used in combination with either `MYSQLI_STORE_RESULT` or `MYSQLI_USE_RESULT` constant.
	 * @return bool|mysqli_result Returns `false` on failure. For successful queries which produce a result set, such as `SELECT, SHOW, DESCRIBE` or `EXPLAIN`, mysqli_query() will return a mysqli_result object. For other successful queries, mysqli_query() will return `true` .
	 */
	public function query($resource, $resultmode = NULL): mysqli_result|bool
	{
		if($result = parent::query($resource))
		{
			$this->queryCount++;
			return $result;
		}
		else
		{
			throw new Exception("SQL Error: ".$this->error."<br><br>Query Code: ".$resource);
		}
	}

	public function getFirstRow($resource)
	{		
		return $this->uniquequery($resource);
	}

	public function uniquequery($resource)
	{		
		$result = $this->query($resource);
		$Return = $result->fetch_array(MYSQLI_ASSOC);
		$result->close();
		return $Return;
		
	}
	/**
	 * Purpose a query on selected database.
	 *
	 * @param string	The SQL query
	 *
	 * @return resource	Results of the query
	 */

	public function getFirstCell($resource)
	{		
		return $this->countquery($resource);
	}
	public function countquery($resource)
	{		
		$result = $this->query($resource);
		list($Return) = $result->fetch_array(MYSQLI_NUM);
		$result->close();
		return $Return;
	}	
	/**
	 * Purpose a query on selected database.
	 *
	 * @param string	The SQL query
	 *
	 * @return resource	Results of the query
	 */

	public function fetchquery($resource, $encode = array())
	{		
		$result = $this->query($resource);
		$Return	= array();

		while($Data	= $result->fetch_array(MYSQLI_ASSOC)) {
			foreach($Data as $Key => $Store) {
				if(in_array($Key, $encode))
					$Data[$Key]	= base64_encode($Store);
			}
			$Return[]	= $Data;
		}
		$result->close();
		return $Return;
	}

	/**
	 * Returns the row of a query as an array.
	 *
	 * @param $result mysqli_result
	 *
	 * @return array	The data of a row
	 */
	public function fetchArray($result)
	{
		return $result->fetch_array(MYSQLI_ASSOC);
	}
	
	public function fetch_array($result)
	{
		return $this->fetchArray($result);
	}

	/**
	 * Returns the row of a query as an array.
	 *
	 * @param $result mysqli_result
	 *
	 * @return array	The data of a row
	 */
	public function fetch_num($result)
	{
		return $result->fetch_array(MYSQLI_NUM);
	}

	/**
	 * Returns the total row numbers of a query.
	 *
	 * @param resource	The SQL query id
	 *
	 * @return integer	The total row number
	 */
	public function numRows($query)
	{
		return $query->num_rows;
	}
	
	public function affectedRows()
	{
		return $this->affected_rows;
	}

	/**
	 * Returns the total row numbers of a query.
	 *
	 * @param resource	The SQL query id
	 *
	 * @return integer	The total row number
	 */
	public function GetInsertID()
	{
		return $this->insert_id;
	}

	/**
	 * Escapes a string for a safe SQL query.
	 *
	 * @param string The string that is to be escaped.
	 *
	 * @return string Returns the escaped string, or false on error.
	 */
	
    public function escape($string, $flag = false)
    {
		return $this->sql_escape($string, $flag);
    }
	
    public function sql_escape($string, $flag = false)
    {
		return ($flag === false) ? parent::escape_string($string): addcslashes(parent::escape_string($string), '%_');
    }
	
	public function str_correction($str)
	{
		return stripcslashes($str);
	}

	/**
	 * Returns used mysqli-Verions.
	 *
	 * @return string	mysqli-Version
	 */
	public function getVersion()
	{
		return parent::get_client_info();
	}
	
	/**
	 * Returns used mysqli-Verions.
	 *
	 * @return string	mysqli-Version
	 */
	public function getServerVersion()
	{
		return $this->server_info;
	}

	/**
	 * Frees stored result memory for the given statement handle.
	 *
	 * @param $resource mysqli_result
	 *
	 * @return void
	 */
	public function free_result($resource)
	{
        $resource->close();
        return;
	}
	
	public function multi_query($resource): bool
	{
		if(parent::multi_query($resource))
		{
			do {
			    if ($result = parent::store_result())
					$result->free();
				
				$this->queryCount++;
					
				if(!parent::more_results()){break;}
					
			} while (parent::next_result());		
		}
	
		if ($this->errno)
		{
			throw new Exception("SQL Error: ".$this->error."<br><br>Query Code: ".$resource);
		}
	}
	
	public function get_sql()
	{
		return $this->queryCount;
	}
}
