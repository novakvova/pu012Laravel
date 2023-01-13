<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

/**
 * @OA\Info(
 *      version="1.0.0",
 *      title="Api Project",
 *      description="Demo my Project ",
 *      @OA\Contact(
 *          email="admin@gmail.com"
 *      ),
 *     @OA\License(
 *         name="Apache 2.0",
 *         url="https://www.apache.org/licenses/LICENSE-2.0.html"
 *     )
 * )
 *
 * @OA\Get(
 *     tags={"Product"},
 *     path="/api/products",
 *     @OA\Parameter(
 *      name="page",
 *      in="query",
 *      required=true,
 *      @OA\Schema(
 *           type="string"
 *      )
 *   ),
 *     @OA\Parameter(
 *      name="name",
 *      in="query",
 *      required=false,
 *      @OA\Schema(
 *           type="string"
 *      )
 *   ),
 *     @OA\Response(response="200", description="List Products.")
 * )
 */
class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
}
