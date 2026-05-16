<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();

            $table->string('store')->nullable();

            $table->string('email')->nullable();

            $table->string('phone')->nullable();

            $table->string('city_ar')->nullable();
            
            $table->string('city_fr')->nullable();

            $table->string('address')->nullable();

            $table->string('google_maps')->nullable();

            $table->string('logo')->nullable();

            $table->string('favicon')->nullable();

            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
