<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;
use RuntimeException;

class ImageOptimizer
{
    public const DEFAULT_MAX_WIDTH = 1920;

    public const DEFAULT_MAX_HEIGHT = 1920;

    public const AVATAR_MAX_SIZE = 400;

    public const THUMBNAIL_MAX_SIZE = 600;

    public const WEBP_QUALITY = 82;

    public function optimizeAndStore(
        UploadedFile $file,
        string $directory,
        int $maxWidth = self::DEFAULT_MAX_WIDTH,
        int $maxHeight = self::DEFAULT_MAX_HEIGHT
    ): string {
        $source = $this->createImageResource($file);

        if (!$source) {
            throw new RuntimeException('Failed to read image file.');
        }

        $origWidth = imagesx($source);
        $origHeight = imagesy($source);

        [$newWidth, $newHeight] = $this->calculateDimensions(
            $origWidth,
            $origHeight,
            $maxWidth,
            $maxHeight
        );

        $dest = imagecreatetruecolor($newWidth, $newHeight);

        imagealphablending($dest, false);
        imagesavealpha($dest, true);
        $transparent = imagecolorallocatealpha($dest, 0, 0, 0, 127);
        imagefill($dest, 0, 0, $transparent);

        imagecopyresampled(
            $dest,
            $source,
            0,
            0,
            0,
            0,
            $newWidth,
            $newHeight,
            $origWidth,
            $origHeight
        );

        $useWebp = function_exists('imagewebp');
        $extension = $useWebp ? 'webp' : 'jpg';
        $filename = $directory . '/' . Str::uuid() . '.' . $extension;
        $fullPath = storage_path('app/public/' . $filename);

        $dir = dirname($fullPath);

        if (!is_dir($dir)) {
            mkdir($dir, 0755, true);
        }

        if ($useWebp) {
            imagewebp($dest, $fullPath, self::WEBP_QUALITY);
        } else {
            imagejpeg($dest, $fullPath, self::WEBP_QUALITY);
        }

        imagedestroy($source);
        imagedestroy($dest);

        return $filename;
    }

    private function createImageResource(UploadedFile $file): \GdImage|false
    {
        $mime = $file->getMimeType();
        $path = $file->getRealPath();

        return match ($mime) {
            'image/jpeg', 'image/jpg' => imagecreatefromjpeg($path),
            'image/png' => imagecreatefrompng($path),
            'image/webp' => function_exists('imagecreatefromwebp')
                ? imagecreatefromwebp($path)
                : false,
            default => false,
        };
    }

    /**
     * @return array{0: int, 1: int}
     */
    private function calculateDimensions(
        int $width,
        int $height,
        int $maxWidth,
        int $maxHeight
    ): array {
        if ($width <= $maxWidth && $height <= $maxHeight) {
            return [$width, $height];
        }

        $ratio = min($maxWidth / $width, $maxHeight / $height);

        return [
            (int) round($width * $ratio),
            (int) round($height * $ratio),
        ];
    }
}
