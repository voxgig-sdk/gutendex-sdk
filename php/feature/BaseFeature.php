<?php
declare(strict_types=1);

// Gutendex SDK base feature

class GutendexBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(GutendexContext $ctx, array $options): void {}
    public function PostConstruct(GutendexContext $ctx): void {}
    public function PostConstructEntity(GutendexContext $ctx): void {}
    public function SetData(GutendexContext $ctx): void {}
    public function GetData(GutendexContext $ctx): void {}
    public function GetMatch(GutendexContext $ctx): void {}
    public function SetMatch(GutendexContext $ctx): void {}
    public function PrePoint(GutendexContext $ctx): void {}
    public function PreSpec(GutendexContext $ctx): void {}
    public function PreRequest(GutendexContext $ctx): void {}
    public function PreResponse(GutendexContext $ctx): void {}
    public function PreResult(GutendexContext $ctx): void {}
    public function PreDone(GutendexContext $ctx): void {}
    public function PreUnexpected(GutendexContext $ctx): void {}
}
