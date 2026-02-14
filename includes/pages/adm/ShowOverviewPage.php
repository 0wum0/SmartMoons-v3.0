<?php

declare(strict_types=1);
/**
 * SmartMoons Admin Dashboard - ShowOverviewPage
 * 
 * Lädt alle Dashboard-Daten via AdminStatsService und rendert die Übersicht.
 * Unterstützt AJAX-Requests für Zeitraum-Wechsel.
 *
 * @package SmartMoons
 * @version 3.1.0
 */

require_once 'includes/pages/adm/AdminStatsService.php';

function ShowOverviewPage()
{
    global $LNG, $USER;

    $period = HTTP::_GP('period', 'day');
    if (!in_array($period, ['day', 'week', 'month', 'year'])) {
        $period = 'day';
    }

    $stats = AdminStatsService::getInstance();

    // Vollständiger Report
    $report = $stats->getFullReport($period);

    // Chart-Daten
    $chartData = $stats->getFullChartData($period);

    // AJAX Request - nur JSON zurückgeben
    if (AJAX_REQUEST || HTTP::_GP('ajax', 0) === 1) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode([
            'report' => $report,
            'charts' => $chartData,
            'period' => $period,
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    // Zeitraum-Labels
    $periodLabels = [
        'day' => 'Heute (24h)',
        'week' => 'Diese Woche (7 Tage)',
        'month' => 'Dieser Monat (30 Tage)',
        'year' => 'Dieses Jahr (365 Tage)',
    ];

    // System Warnings (behalten aus Original)
    $Message = [];
    if ($USER['authlevel'] >= AUTH_ADM) {
        if (file_exists(ROOT_PATH . 'update.php'))
            $Message[] = sprintf($LNG['ow_file_detected'], 'update.php');

        if (file_exists(ROOT_PATH . 'webinstall.php'))
            $Message[] = sprintf($LNG['ow_file_detected'], 'webinstall.php');

        if (file_exists('includes/ENABLE_INSTALL_TOOL'))
            $Message[] = sprintf($LNG['ow_file_detected'], 'includes/ENABLE_INSTALL_TOOL');

        if (!is_writable(ROOT_PATH . 'cache'))
            $Message[] = sprintf($LNG['ow_dir_not_writable'], 'cache');

        if (!is_writable('includes'))
            $Message[] = sprintf($LNG['ow_dir_not_writable'], 'includes');
    }

    // Universe Info für Topbar
    $universeSelect = [];
    foreach (Universe::availableUniverses() as $uniId) {
        $config = Config::get($uniId);
        $universeSelect[$uniId] = sprintf('%s (ID: %d)', $config->uni_name, $uniId);
    }
    ksort($universeSelect);

    $config = Config::get();

    // Support Ticket Count für Sidebar Badge
    $supportTicketCount = 0;
    try {
        $ticketResult = $GLOBALS['DATABASE']->getFirstCell(
            "SELECT COUNT(*) FROM " . TICKETS . " WHERE universe = " . Universe::getEmulated() . " AND status = 0;"
        );
        $supportTicketCount = (int)$ticketResult;
    } catch (\Exception $e) {
        $supportTicketCount = 0;
    }

    $template = new template();

    $template->assign_vars([
        // Dashboard Data
        'report'             => $report,
        'chartData'          => $chartData,
        'period'             => $period,
        'periodLabel'        => $periodLabels[$period] ?? 'Heute',
        'Messages'           => $Message,

        // Layout Data
        'uniName'            => $config->uni_name ?? 'Universe',
        'currentUser'        => $USER,
        'authlevel'          => $USER['authlevel'],
        'AvailableUnis'      => $universeSelect,
        'UNI'                => Universe::getEmulated(),
        'sid'                => session_id(),

        // Sidebar
        'supportTicketCount' => $supportTicketCount,

        // Legacy vars
        'ow_none'            => $LNG['ow_none'],
        'ow_overview'        => $LNG['ow_overview'],
        'ow_title'           => $LNG['ow_title'],
        'date'               => date('m\_Y', TIMESTAMP),
    ]);

    $template->show('OverviewBody.tpl');
}
