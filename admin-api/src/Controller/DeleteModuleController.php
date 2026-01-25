<?php
namespace App\Controller;

use App\Response\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Process\Process;

class DeleteModuleController
{


    #[Route('/api/modules', name: 'delete_module', methods: 'DELETE')]
    public function deleteModule(): Response
    {

        return new JsonResponse([
            'modules' => 'blub'
        ]);
    }
}
