<?php
namespace App\Controller;

use App\Response\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class GetModulesController
{

    function getIdentifierForModule(string $identifier, string $version): string
    {
        return hash('sha3-256', sprintf("%s:%s", $identifier, $version));
    }

    #[Route('/api/modules', name: 'get_modules')]
    public function getModules(): Response
    {



        $data = [
            'modules' => [
                [
                    'id' => $this->getIdentifierForModule('@ember-nexus/app-plugin-experimental', '0.1.2'),
                    'packageIdentifier' => '@ember-nexus/app-plugin-experimental',
                    'version' => '0.1.2',
                    'canBeUpgraded' => true,
                    'name' => 'App Plugin Experimental',
                    'description' => 'Some experimental plugin etc.',
                    'license' => 'MIT',
                    'source' => 'NPM',
                    'homepage' => 'https://github.com/npm/example#readme'
                ],
                [
                    'id' => $this->getIdentifierForModule('@my-org/test', '1.0.0'),
                    'packageIdentifier' => '@my-org/test',
                    'version' => '1.0.0',
                    'canBeUpgraded' => false,
                    'name' => 'Test Module',
                    'description' => 'Internal test module',
                    'license' => 'proprietary',
                    'source' => 'PACK',
                    'homepage' => null
                ],
            ]
        ];

        return new JsonResponse($data);
    }
}
