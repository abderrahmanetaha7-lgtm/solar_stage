<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function index()
    {
        return Setting::first();
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
            'logo' => 'nullable|image|max:2048',
            'favicon' => 'nullable|image|max:1024',
        ]);

        if ($request->hasFile('logo')) {

            $logo = $request->file('logo')
                ->store('settings', 'public');

            $data['logo'] = $logo;
        }

        if ($request->hasFile('favicon')) {

            $favicon = $request->file('favicon')
                ->store('settings', 'public');

            $data['favicon'] = $favicon;
        }

        $setting->update($data);

        return response()->json([
            'message' => __('messages.settings_updated'),
            'settings' => $setting,
        ]);
    }
}