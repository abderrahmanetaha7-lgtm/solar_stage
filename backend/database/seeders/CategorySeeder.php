<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name_fr' => 'Panneaux solaires',
                'name_ar' => 'ألواح شمسية',
            ],

            [
                'name_fr' => 'Batteries',
                'name_ar' => 'بطاريات',
            ],

            [
                'name_fr' => 'Onduleurs',
                'name_ar' => 'محولات',
            ],

            [
                'name_fr' => 'Accessoires',
                'name_ar' => 'إكسسوارات',
            ],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
