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

require_once('vendor/autoload.php');

use Twig\Environment;
use Twig\Loader\FilesystemLoader;
use Twig\TwigFunction;
use Twig\TwigFilter;

class template
{
	protected string $window = 'full';
	public array $jsscript = array();
	public array $script = array();
	
	private Environment $twig;
	private array $templateVars = array();
	private string $templateDir = 'styles/templates/';
	private string $currentSubDir = '';
	
	function __construct()
	{	
		$this->twigSettings();
	}

	private function twigSettings(): void
	{
		// Setup Twig Loader with multiple namespaces for templates
		$loader = new FilesystemLoader($this->templateDir);
		
		// Add subdirectories as additional paths for better template resolution
		$loader->addPath($this->templateDir . 'login', 'login');
		$loader->addPath($this->templateDir . 'game', 'game');
		$loader->addPath($this->templateDir . 'adm', 'adm');
		$loader->addPath($this->templateDir . 'install', 'install');
		
		// Create Twig Environment
		$this->twig = new Environment($loader, [
			'cache' => is_writable(CACHE_PATH) ? CACHE_PATH . 'twig/' : $this->getTempPath() . '/twig/',
			'debug' => true, // Set false for production!
			'auto_reload' => true,
			'strict_variables' => false,
		]);
		
		// Add custom functions if needed
		$this->addCustomFunctions();
		$this->addCustomFilters();
	}

	private function addCustomFunctions(): void
	{
		// Register allowedTo function for Twig templates (for rights/permissions checking)
		$this->twig->addFunction(new TwigFunction('allowedTo', function(string $right): bool {
			global $USER;
			// Fallback: Admins dürfen alles
			if (isset($USER['authlevel']) && $USER['authlevel'] >= AUTH_ADM) {
				return true;
			}
			// Falls Rechte-Array existiert, prüfen
			if (isset($USER['rights']) && is_array($USER['rights'])) {
				return in_array($right, $USER['rights']);
			}
			return false;
		}));
		
		// Register isModuleAvailable function for Twig templates
		$this->twig->addFunction(new TwigFunction('isModuleAvailable', function(int $moduleId): bool {
			return isModuleAvailable($moduleId);
		}));
		
		// Register constant function for Twig templates to access PHP constants
		$this->twig->addFunction(new TwigFunction('constant', function(string $name) {
			return constant($name);
		}));
		
		// Register shortly_number function for Twig templates
		$this->twig->addFunction(new TwigFunction('shortly_number', function($number, ?int $decimal = null): string {
			return shortly_number($number, $decimal);
		}));
		
		// Register common PHP math functions for Twig templates
		$this->twig->addFunction(new TwigFunction('min', function(...$values) {
			return min(...$values);
		}));
		
		$this->twig->addFunction(new TwigFunction('max', function(...$values) {
			return max(...$values);
		}));
		
		$this->twig->addFunction(new TwigFunction('abs', function($number) {
			return abs($number);
		}));
		
		$this->twig->addFunction(new TwigFunction('round', function($number, int $precision = 0, int $mode = PHP_ROUND_HALF_UP) {
			return round($number, $precision, $mode);
		}));
		
		$this->twig->addFunction(new TwigFunction('floor', function($number) {
			return floor($number);
		}));
		
		$this->twig->addFunction(new TwigFunction('ceil', function($number) {
			return ceil($number);
		}));
		
		$this->twig->addFunction(new TwigFunction('floatval', function($value) {
			return floatval($value);
		}));
		
		// Register PHP helper functions for Twig templates
		$this->twig->addFunction(new TwigFunction('empty', function($value): bool {
			return empty($value);
		}));
		
		$this->twig->addFunction(new TwigFunction('count', function($value): int {
			return is_countable($value) ? count($value) : 0;
		}));
	}

	private function addCustomFilters(): void
	{
		// Register pretty_time filter for Twig templates
		$this->twig->addFilter(new TwigFilter('time', function($seconds) {
			return pretty_time($seconds);
		}));
		
		// Register number filter alias for number_format
		$this->twig->addFilter(new TwigFilter('number', function($number, int $decimals = 0, string $decPoint = ',', string $thousandsSep = '.') {
			return number_format((float)$number, $decimals, $decPoint, $thousandsSep);
		}));
		
		// Register json filter alias for json_encode
		$this->twig->addFilter(new TwigFilter('json', function($value, int $options = 0, int $depth = 512) {
			return json_encode($value, $options, $depth);
		}));
	}

	private function getTempPath(): string
	{
		require_once 'includes/libs/wcf/BasicFileUtil.class.php';
		return BasicFileUtil::getTempFolder();
	}
	
	public function assign_vars(array $var, bool $nocache = true): void
	{		
		$this->templateVars = array_merge($this->templateVars, $var);
	}

	public function loadscript(string $script): void
	{
		$this->jsscript[] = substr($script, 0, -3);
	}

	public function execscript(string $script): void
	{
		$this->script[] = $script;
	}
	
	private function adm_main(): void
	{
		global $LNG, $USER;
		
		$dateTimeServer = new DateTime("now");
		if(isset($USER['timezone'])) {
			try {
				$dateTimeUser = new DateTime("now", new DateTimeZone($USER['timezone']));
			} catch (Exception $e) {
				$dateTimeUser = $dateTimeServer;
			}
		} else {
			$dateTimeUser = $dateTimeServer;
		}

		$config	= Config::get();

		$this->assign_vars(array(
			'scripts'			=> $this->script,
			'title'				=> $config->game_name.' - '.$LNG['adm_cp_title'],
			'fcm_info'			=> $LNG['fcm_info'],
            'lang'    			=> $LNG->getLanguage(),
			'REV'				=> substr($config->VERSION, -4),
			'date'				=> explode("|", date('Y\|n\|j\|G\|i\|s\|Z', TIMESTAMP)),
			'Offset'			=> $dateTimeUser->getOffset() - $dateTimeServer->getOffset(),
			'VERSION'			=> $config->VERSION,
			'dpath'				=> 'styles/theme/gow/',
			'bodyclass'			=> 'full'
		));
	}
	
	public function show(string $file): void
	{		
		global $LNG, $THEME;

		// Determine template directory based on mode
		$templatePath = $this->templateDir;
		
		if(MODE === 'INSTALL') {
			$this->currentSubDir = 'install/';
		} elseif(MODE === 'ADMIN') {
			$this->currentSubDir = 'adm/';
			$this->adm_main();
		} elseif(isset($THEME) && $THEME->isCustomTPL($file)) {
			$templatePath = $THEME->getTemplatePath();
		}

		// Update Twig loader with new path if needed
		if($this->currentSubDir !== '') {
			$loader = new FilesystemLoader($templatePath . $this->currentSubDir);
			$this->twig->setLoader($loader);
		}

		// Assign final variables
		$this->assign_vars(array(
			'scripts'		=> $this->jsscript,
			'execscript'	=> implode("\n", $this->script),
		));

		$this->assign_vars(array(
			'LNG'			=> $LNG,
		), false);
		
		// Convert .tpl extension to .twig
		$twigFile = str_replace('.tpl', '.twig', $file);
		
		// Render and output
		echo $this->twig->render($twigFile, $this->templateVars);
	}
	
	public function display(string $file): void
	{
		global $LNG;
		
		// Convert .tpl extension to .twig
		$twigFile = str_replace('.tpl', '.twig', $file);
		
		// Render and output
		echo $this->twig->render($twigFile, $this->templateVars);
	}
	
	public function gotoside(string $dest, int $time = 3): void
	{
		$this->assign_vars(array(
			'gotoinsec'	=> $time,
			'goto'		=> $dest,
		));
	}
	
	public function message(string $mes, $dest = false, int $time = 3, bool $Fatal = false): void
	{
		global $LNG, $THEME;
	
		$this->assign_vars(array(
			'mes'		=> $mes,
			'fcm_info'	=> $LNG['fcm_info'],
			'Fatal'		=> $Fatal,
            'dpath'		=> $THEME->getTheme(),
		));
		
		$this->gotoside($dest !== false ? $dest : '', $time);
		$this->show('error_message_body.twig');
	}
	
	public static function printMessage(string $Message, bool $fullSide = true, ?array $redirect = NULL): void
	{
		$template = new self;
		if(!isset($redirect)) {
			$redirect = array(false, 0);
		}
		
		$template->message($Message, $redirect[0], (int)$redirect[1], !$fullSide);
		exit;
	}
	
	// Compatibility methods for Smarty-like access
	public function getTemplateDir(): array
	{
		return [$this->templateDir];
	}
	
	public function setTemplateDir(string $dir): void
	{
		$this->templateDir = rtrim($dir, '/') . '/';
		$loader = new FilesystemLoader($this->templateDir);
		$this->twig->setLoader($loader);
	}
	
	public function getCompileDir(): string
	{
		return CACHE_PATH . 'twig/';
	}
	
	public function clearAllCache(): void
	{
		$cacheDir = ROOT_PATH . 'cache/twig';
		if (!is_dir($cacheDir)) {
			return;
		}

		$files = new RecursiveIteratorIterator(
			new RecursiveDirectoryIterator($cacheDir, RecursiveDirectoryIterator::SKIP_DOTS),
			RecursiveIteratorIterator::CHILD_FIRST
		);

		foreach ($files as $fileinfo) {
			$todo = ($fileinfo->isDir() ? 'rmdir' : 'unlink');
			$todo($fileinfo->getRealPath());
		}
	}
}
