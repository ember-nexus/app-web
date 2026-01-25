<?php
namespace App\Controller;

use App\Response\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Process\Process;

class GetModulesController
{

    /**
     * @param string[] $keywords
     * @return array
     */
    function getModulesByKeywords(array $keywords): array
    {
        $npmDir = '/var/www/html/pwa';

        // Run npm command
        $process = new Process(['npm', 'ls', '--all', '--parseable']);
        $process->setWorkingDirectory($npmDir);

        $process->mustRun();

        $output = $process->getOutput();
        $paths = array_filter(explode("\n", $output));

        $modules = [];

        $mainPackageData = json_decode(file_get_contents("/var/www/html/pwa/package.json"), true);

        foreach ($paths as $path) {
            // Ensure folder exists
            if (!is_dir($path)) {
                continue;
            }
            $packageJsonPath = sprintf("%s/package.json", $path);
            if (!file_exists($packageJsonPath)) {
                continue;
            }
            $packageData = json_decode(file_get_contents($packageJsonPath), true);
            if (!$packageData) {
                continue;
            }
            if (
                isset($packageData['keywords']) &&
                is_array($packageData['keywords']) &&
                array_intersect($keywords, $packageData['keywords'])
            ) {
                $modules[] = [
                    'name' => $packageData['name'],
                    'version' => $packageData['version'],
                    'canBeUpgraded' => false,
                    'description' => $packageData['description'] ?? '-',
                    'license' => $packageData['license'] ?? '-',
                    'source' => 'NPM',
                    'homepage' => $packageData['homepage'] ?? null,
                    'transitive' => !array_key_exists($packageData['name'], $mainPackageData['dependencies'])
                ];
            }
        }

        return $modules;
    }

    public function enrichModules(array $modules): array
    {
        $npmDir = '/var/www/html/pwa';
        foreach ($modules as $key => $module) {
            $process = new Process(['npm', 'ls', '--json', $module['name']]);
            $process->setWorkingDirectory($npmDir);
            $process->mustRun();
            $output = $process->getOutput();
            $output = json_decode($output, true);

            $foundModule = false;
            $outputModule = $output;
            while ($foundModule === false) {
                $outputModule = $outputModule['dependencies'];
                $outputModuleName = array_keys($outputModule);
                if (count($outputModuleName) != 1) {
                    continue 2;
                }
                $outputModuleName = $outputModuleName[0];
                $outputModule = $outputModule[$outputModuleName];
                if ($outputModuleName === $module['name']) {
                    $foundModule = true;
                }
            }

            $source = 'other';
            $resolvedString = $outputModule['resolved'];
            if (str_starts_with($resolvedString, 'https://registry.npmjs.org')) {
                $source = 'NPM';
            } else if (str_starts_with($resolvedString, 'file:')) {
                $source = 'PACK';
            }

            $modules[$key]['source'] = $source;
        }

        return $modules;
    }

    #[Route('/api/modules', name: 'get_modules')]
    public function getModules(): Response
    {
        $modules = $this->getModulesByKeywords(['ember-nexus-plugin']);

        $modules = $this->enrichModules($modules);

        return new JsonResponse([
            'modules' => $modules
        ]);
    }
}
