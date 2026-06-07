<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use App\Services\ImageOptimizer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class SettingController extends Controller
{
    public function __construct(
        private readonly ImageOptimizer $imageOptimizer
    ) {}

    public function index()
    {
        return Cache::remember('app_settings', 3600, function () {
            return Setting::first();
        });
    }

    public function update(Request $request)
    {
        $setting = Setting::first();

        if (!$setting) {
            $setting = Setting::create([]);
        }

        $data = $request->validate([
            'store' => 'nullable|string|max:100',
            'email' => 'nullable|email',
            'phone' => 'nullable|string|max:100',
            'city_ar' => 'nullable|string|max:50',
            'city_fr' => 'nullable|string|max:50',
            'google_maps' => 'nullable|string',
            'description' => 'nullable|string',
            'logo' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'favicon' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:1024',
        ]);

        if ($request->hasFile('logo')) {

            if ($setting->logo) {
                Storage::disk('public')->delete($setting->logo);
            }

            $data['logo'] = $this->imageOptimizer->optimizeAndStore(
                $request->file('logo'),
                'settings',
                ImageOptimizer::THUMBNAIL_MAX_SIZE,
                ImageOptimizer::THUMBNAIL_MAX_SIZE
            );
        }

        if ($request->hasFile('favicon')) {

            if ($setting->favicon) {
                Storage::disk('public')->delete($setting->favicon);
            }

            $data['favicon'] = $this->imageOptimizer->optimizeAndStore(
                $request->file('favicon'),
                'settings',
                128,
                128
            );
        }

        $setting->update($data);

        Cache::forget('app_settings');

        return response()->json([
            'message' => __('messages.settings_updated'),
            'settings' => $setting,
        ]);
    }
}
