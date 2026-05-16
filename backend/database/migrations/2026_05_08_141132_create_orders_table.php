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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();

            $table->string('first_name');
            $table->string('last_name');

            $table->string('email');
            $table->string('phone');

            $table->text('address');

            $table->string('city');
            $table->string('postal_code')->nullable();
            $table->string('country')->default('Maroc');

            $table->decimal('total', 10, 2);

            $table->enum('status', [
                'Pending',  
                'Confirmed',
                'Delivered',
                'Returned', 
                'Cancelled', 
            ])->default('Pending')->index();
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
