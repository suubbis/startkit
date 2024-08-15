<?php

namespace App\Console\Commands;

use Illuminate\Console\GeneratorCommand;
use Illuminate\Support\Facades\Artisan;
use App\Console\Commands\Traits\ServiceProviderInjector;

class RepositoryMakeCommand extends GeneratorCommand
{
    use ServiceProviderInjector;
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:repository {name}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new Repository class';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $codeToAdd = "\n\t\t\$this->app->bind(\n" .
                "\t\t\t\\App\\Repository\\Interfaces\\" . str_replace('/', '\\', $this->argument('name')) . "Interface::class,\n" .
                "\t\t\t\\App\\Repository\\" . str_replace('/', '\\', $this->argument('name')) . "::class\n" .
                "\t\t);\n";

        $appServiceProviderFile = app_path('Providers/RepositoryServiceProvider.php');

        $this->injectCodeToRegisterMethod($appServiceProviderFile, $codeToAdd);

        Artisan::call('make:interface', [
            'name' => $this->argument('name') . 'Interface'
        ]);
        return parent::handle();
    }

    protected function getStub()
    {
        return __DIR__ . '/stubs/repository.stub';
    }

    protected function getDefaultNamespace($rootNamespace)
    {
        return $rootNamespace.'\\Repository';
    }
}
