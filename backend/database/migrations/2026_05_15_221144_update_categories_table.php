<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('categories', function (Blueprint $table) {
            $table->string('name_fr')->after('id');
            $table->string('name_ar')->after('name_fr');

            $table->dropColumn('name');
        });
    }

    public function down(): void
    {
        Schema::table('categories', function (Blueprint $table) {
            $table->string('name');

            $table->dropColumn(['name_fr', 'name_ar']);
        });
    }
};
