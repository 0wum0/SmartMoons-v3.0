<?php

declare(strict_types=1);

final class ApiAuth
{
    public static function assertIngameSession($user, $planet): void
    {
        if (empty($user) || !is_array($user)) {
            ApiResponse::fail('AUTH_REQUIRED', 'User session is missing.', 401);
        }

        if (empty($planet) || !is_array($planet)) {
            ApiResponse::fail('PLANET_CONTEXT_MISSING', 'Active planet context is missing.', 409);
        }

        if (!isset($user['id']) || (int)$user['id'] <= 0) {
            ApiResponse::fail('INVALID_USER_CONTEXT', 'User context is invalid.', 401);
        }

        if (!isset($planet['id']) || (int)$planet['id'] <= 0) {
            ApiResponse::fail('INVALID_PLANET_CONTEXT', 'Planet context is invalid.', 409);
        }
    }
}
