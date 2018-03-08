<?php

namespace App\Http\Middleware;

use Closure;
use JWTAuth;
use Exception;
use Tymon\JWTAuth\Http\Middleware\BaseMiddleware;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;


class authJWT extends BaseMiddleware
{
    public function handle($request, Closure $next)
    {
        try {
            $user = JWTAuth::authenticate(JWTAuth::getToken());
        } catch(Exception $e) {
            if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException) {
                $newToken = JWTAuth::refresh(JWTAuth::getToken());
                JWTAuth::setToken($newToken);
                $response = $next($request);
                if (!$response instanceof SymfonyResponse) {
                    $response = new Response($response);
                }

                $response->headers->set('newToken', $newToken);
                return $response;
            }

            throw $e;
        }

        return $next($request);
    }
}
