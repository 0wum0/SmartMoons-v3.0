<?php

declare(strict_types=1);

define('MODE', 'INGAME');
define('ROOT_PATH', str_replace('\\', '/', dirname(__FILE__)) . '/');
set_include_path(ROOT_PATH);

require_once 'includes/common.php';
require_once 'includes/vars.php';
require_once 'includes/api/ApiResponse.php';
require_once 'includes/api/ApiAuth.php';

ApiAuth::assertIngameSession($USER, $PLANET);

$action = HTTP::_GP('action', 'game_state');


function requestMethod(): string
{
    return strtoupper($_SERVER['REQUEST_METHOD'] ?? 'GET');
}

function requireMethod(array $allowedMethods): void
{
    $method = requestMethod();
    if (!in_array($method, $allowedMethods, true)) {
        ApiResponse::fail('METHOD_NOT_ALLOWED', 'HTTP method not allowed for this action.', 405, [
            'allowed' => $allowedMethods,
            'received' => $method,
        ]);
    }
}


function requiredPositiveInt(string $key): int
{
    $value = (int)HTTP::_GP($key, 0);
    if ($value <= 0) {
        ApiResponse::fail('VALIDATION_ERROR', sprintf('Parameter "%s" must be a positive integer.', $key), 422);
    }
    return $value;
}

function boundedIntParam(string $key, int $default, int $min, int $max): int
{
    return max($min, min($max, (int)HTTP::_GP($key, $default)));
}

try {
    switch ($action) {
        case 'game_state':
            requireMethod(['GET']);
            ApiResponse::ok([
                'user' => [
                    'id' => (int)$USER['id'],
                    'name' => (string)$USER['username'],
                    'authlevel' => (int)$USER['authlevel'],
                    'universe' => (int)$USER['universe'],
                ],
                'planet' => [
                    'id' => (int)$PLANET['id'],
                    'name' => (string)$PLANET['name'],
                    'image' => (string)$PLANET['image'],
                    'coords' => [
                        'galaxy' => (int)$PLANET['galaxy'],
                        'system' => (int)$PLANET['system'],
                        'planet' => (int)$PLANET['planet'],
                    ],
                ],
            ]);
            break;

        case 'planet_state':
            requireMethod(['GET']);
            ApiResponse::ok([
                'planet' => [
                    'id' => (int)$PLANET['id'],
                    'name' => (string)$PLANET['name'],
                    'diameter' => (int)$PLANET['diameter'],
                    'field_current' => (int)$PLANET['field_current'],
                    'field_max' => (int)$PLANET['field_max'],
                    'temp_min' => (int)$PLANET['temp_min'],
                    'temp_max' => (int)$PLANET['temp_max'],
                    'image' => (string)$PLANET['image'],
                ],
            ]);
            break;

        case 'resources':
            requireMethod(['GET']);
            ApiResponse::ok([
                'resources' => [
                    'metal' => (float)$PLANET['metal'],
                    'crystal' => (float)$PLANET['crystal'],
                    'deuterium' => (float)$PLANET['deuterium'],
                    'energy' => (float)$PLANET['energy_current'],
                    'darkmatter' => (float)$USER['darkmatter'],
                ],
            ]);
            break;

        case 'buildings':
            requireMethod(['GET']);
            $planetData = Database::get()->selectSingle(
                'SELECT * FROM %%PLANETS%% WHERE id = :planetId',
                [':planetId' => (int)$PLANET['id']]
            );

            if (empty($planetData)) {
                ApiResponse::fail('PLANET_NOT_FOUND', 'Planet data could not be loaded.', 404);
            }

            $buildings = [];
            $buildingIds = $reslist['build'] ?? [];

            foreach ($buildingIds as $resourceId) {
                if (!isset($resource[$resourceId])) {
                    continue;
                }

                $column = $resource[$resourceId];
                $buildings[] = [
                    'id' => (int)$resourceId,
                    'column' => (string)$column,
                    'level' => isset($planetData[$column]) ? (int)$planetData[$column] : 0,
                ];
            }

            ApiResponse::ok(['buildings' => $buildings]);
            break;


        case 'research':
            requireMethod(['GET']);
            $research = [];
            foreach (($reslist['tech'] ?? []) as $resourceId) {
                if (!isset($resource[$resourceId])) {
                    continue;
                }
                $column = $resource[$resourceId];
                $research[] = [
                    'id' => (int)$resourceId,
                    'column' => (string)$column,
                    'level' => isset($USER[$column]) ? (int)$USER[$column] : 0,
                ];
            }
            ApiResponse::ok(['research' => $research]);
            break;

        case 'shipyard':
            requireMethod(['GET']);
            $ships = [];
            foreach (($reslist['fleet'] ?? []) as $resourceId) {
                if (!isset($resource[$resourceId])) {
                    continue;
                }
                $column = $resource[$resourceId];
                $ships[] = [
                    'id' => (int)$resourceId,
                    'column' => (string)$column,
                    'amount' => isset($PLANET[$column]) ? (int)$PLANET[$column] : 0,
                ];
            }
            ApiResponse::ok(['ships' => $ships]);
            break;

        case 'defense':
            requireMethod(['GET']);
            $defense = [];
            foreach (($reslist['defense'] ?? []) as $resourceId) {
                if (!isset($resource[$resourceId])) {
                    continue;
                }
                $column = $resource[$resourceId];
                $defense[] = [
                    'id' => (int)$resourceId,
                    'column' => (string)$column,
                    'amount' => isset($PLANET[$column]) ? (int)$PLANET[$column] : 0,
                ];
            }
            ApiResponse::ok(['defense' => $defense]);
            break;

        case 'fleets':
            requireMethod(['GET']);
            $fleets = Database::get()->select(
                'SELECT fleet_id, fleet_mission, fleet_amount, fleet_start_time, fleet_end_time, fleet_target_owner, fleet_target_galaxy, fleet_target_system, fleet_target_planet FROM %%FLEETS%% WHERE fleet_owner = :userId ORDER BY fleet_end_time ASC LIMIT :limit OFFSET :offset',
                [':userId' => (int)$USER['id'], ':limit' => boundedIntParam('limit', 50, 1, 100), ':offset' => boundedIntParam('offset', 0, 0, 1000)]
            );
            ApiResponse::ok(['fleets' => $fleets]);
            break;

        case 'messages':
            requireMethod(['GET']);
            $messages = Database::get()->select(
                'SELECT message_id, message_time, message_from, message_subject, message_type, message_unread FROM %%MESSAGES%% WHERE message_owner = :userId ORDER BY message_time DESC LIMIT :limit OFFSET :offset',
                [':userId' => (int)$USER['id'], ':limit' => boundedIntParam('limit', 50, 1, 100), ':offset' => boundedIntParam('offset', 0, 0, 1000)]
            );
            ApiResponse::ok(['messages' => $messages]);
            break;

        case 'ranking':
            requireMethod(['GET']);
            $ranking = Database::get()->select(
                'SELECT s.id_owner, s.total_rank, s.total_points, u.username FROM %%STATPOINTS%% s INNER JOIN %%USERS%% u ON u.id = s.id_owner WHERE s.stat_type = 1 AND s.universe = :universe ORDER BY s.total_rank ASC LIMIT :limit OFFSET :offset',
                [':universe' => (int)$USER['universe'], ':limit' => boundedIntParam('limit', 50, 1, 100), ':offset' => boundedIntParam('offset', 0, 0, 1000)]
            );
            ApiResponse::ok(['ranking' => $ranking]);
            break;

        case 'galaxy':
            requireMethod(['GET']);
            $galaxy = max(1, (int)HTTP::_GP('galaxy', (int)$PLANET['galaxy']));
            $system = max(1, min(499, (int)HTTP::_GP('system', (int)$PLANET['system'])));

            $positions = Database::get()->select(
                'SELECT p.id, p.name, p.planet, p.image, p.last_update, u.id as owner_id, u.username FROM %%PLANETS%% p LEFT JOIN %%USERS%% u ON u.id = p.id_owner WHERE p.universe = :universe AND p.galaxy = :galaxy AND p.system = :system ORDER BY p.planet ASC',
                [
                    ':universe' => (int)$USER['universe'],
                    ':galaxy' => $galaxy,
                    ':system' => $system,
                ]
            );
            ApiResponse::ok(['galaxy' => $galaxy, 'system' => $system, 'positions' => $positions]);
            break;


        case 'build_building':
            requireMethod(['POST']);
            $elementId = requiredPositiveInt('element');
            if (!in_array($elementId, $reslist['build'] ?? [], true)) {
                ApiResponse::fail('INVALID_BUILDING', 'Unknown or unsupported building element.', 422);
            }
            if (!BuildFunctions::isTechnologieAccessible($USER, $PLANET, $elementId)) {
                ApiResponse::fail('TECH_REQUIREMENTS_NOT_MET', 'Technology requirements are not met.', 409);
            }

            $targetLevel = ((int)($PLANET[$resource[$elementId]] ?? 0)) + 1;
            $price = BuildFunctions::getElementPrice($USER, $PLANET, $elementId, false, $targetLevel);
            $buyable = BuildFunctions::isElementBuyable($USER, $PLANET, $elementId, $price, false, $targetLevel);
            $buildTime = BuildFunctions::getBuildingTime($USER, $PLANET, $elementId, $price, false, $targetLevel);

            ApiResponse::ok([
                'accepted' => false,
                'mode' => 'preview',
                'message' => 'Execution queue wiring pending. Validation and pricing are already active.',
                'building' => [
                    'id' => $elementId,
                    'target_level' => $targetLevel,
                    'buyable' => (bool)$buyable,
                    'build_time_seconds' => (int)$buildTime,
                    'price' => $price,
                ],
            ], 202);
            break;

        case 'start_research':
            requireMethod(['POST']);
            $elementId = requiredPositiveInt('element');
            if (!in_array($elementId, $reslist['tech'] ?? [], true)) {
                ApiResponse::fail('INVALID_RESEARCH', 'Unknown or unsupported research element.', 422);
            }
            if (!BuildFunctions::isTechnologieAccessible($USER, $PLANET, $elementId)) {
                ApiResponse::fail('TECH_REQUIREMENTS_NOT_MET', 'Technology requirements are not met.', 409);
            }

            $targetLevel = ((int)($USER[$resource[$elementId]] ?? 0)) + 1;
            $price = BuildFunctions::getElementPrice($USER, $PLANET, $elementId, false, $targetLevel);
            $buyable = BuildFunctions::isElementBuyable($USER, $PLANET, $elementId, $price, false, $targetLevel);
            $researchTime = BuildFunctions::getBuildingTime($USER, $PLANET, $elementId, $price, false, $targetLevel);

            ApiResponse::ok([
                'accepted' => false,
                'mode' => 'preview',
                'message' => 'Execution queue wiring pending. Validation and pricing are already active.',
                'research' => [
                    'id' => $elementId,
                    'target_level' => $targetLevel,
                    'buyable' => (bool)$buyable,
                    'research_time_seconds' => (int)$researchTime,
                    'price' => $price,
                ],
            ], 202);
            break;

        case 'build_ships':
        case 'build_defense':
        case 'send_fleet':
            requireMethod(['POST']);
            ApiResponse::fail('NOT_IMPLEMENTED', 'Endpoint contract reserved; execution wiring in progress.', 501, [
                'action' => $action,
            ]);
            break;

        default:
            ApiResponse::fail('UNKNOWN_ACTION', 'Action not supported.', 404, ['action' => $action]);
    }
} catch (Throwable $exception) {
    ApiResponse::fail('API_EXCEPTION', 'Unhandled API exception.', 500, [
        'detail' => $exception->getMessage(),
    ]);
}
