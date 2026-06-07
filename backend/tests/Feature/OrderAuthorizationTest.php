<?php

namespace Tests\Feature;

use App\Models\Order;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class OrderAuthorizationTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_only_see_own_orders(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();

        Order::create([
            'user_id' => $user->id,
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'phone' => '0600000000',
            'address' => '123 Street',
            'city' => 'Casablanca',
            'total' => 100,
            'status' => 'Pending',
        ]);

        Order::create([
            'user_id' => $otherUser->id,
            'first_name' => 'Jane',
            'last_name' => 'Doe',
            'email' => 'jane@example.com',
            'phone' => '0600000001',
            'address' => '456 Street',
            'city' => 'Rabat',
            'total' => 200,
            'status' => 'Pending',
        ]);

        $response = $this->actingAs($user)->getJson('/api/orders');

        $response->assertStatus(200)
            ->assertJsonCount(1);
    }

    public function test_user_cannot_view_another_users_order(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();

        $order = Order::create([
            'user_id' => $otherUser->id,
            'first_name' => 'Jane',
            'last_name' => 'Doe',
            'email' => 'jane@example.com',
            'phone' => '0600000001',
            'address' => '456 Street',
            'city' => 'Rabat',
            'total' => 200,
            'status' => 'Pending',
        ]);

        $response = $this->actingAs($user)->getJson('/api/orders/' . $order->id);

        $response->assertStatus(403);
    }

    public function test_admin_can_view_all_orders(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $otherUser = User::factory()->create();

        Order::create([
            'user_id' => $otherUser->id,
            'first_name' => 'Jane',
            'last_name' => 'Doe',
            'email' => 'jane@example.com',
            'phone' => '0600000001',
            'address' => '456 Street',
            'city' => 'Rabat',
            'total' => 200,
            'status' => 'Pending',
        ]);

        $response = $this->actingAs($admin)->getJson('/api/orders');

        $response->assertStatus(200)
            ->assertJsonCount(1);
    }
}
