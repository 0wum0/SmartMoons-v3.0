<?php

declare(strict_types=1);

final class ApiResponse
{
    public static function send(bool $success, array $data = [], ?array $error = null, int $status = 200): void
    {
        if (!headers_sent()) {
            header('Content-Type: application/json; charset=UTF-8');
            http_response_code($status);
        }

        echo json_encode([
            'success' => $success,
            'data' => $data,
            'error' => $error,
            'meta' => [
                'timestamp' => time(),
                'request_id' => self::requestId(),
            ],
        ]);
        exit;
    }

    public static function ok(array $data = [], int $status = 200): void
    {
        self::send(true, $data, null, $status);
    }

    public static function fail(string $code, string $message, int $status = 400, array $context = []): void
    {
        self::send(false, [], [
            'code' => $code,
            'message' => $message,
            'context' => $context,
        ], $status);
    }

    private static function requestId(): string
    {
        static $requestId = null;
        if ($requestId === null) {
            $requestId = bin2hex(random_bytes(8));
        }
        return $requestId;
    }
}
