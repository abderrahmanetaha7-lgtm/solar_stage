<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class ContactValidationTest extends TestCase
{
    use RefreshDatabase;

    public function test_contact_form_requires_name_email_and_message(): void
    {
        Mail::fake();

        $response = $this->postJson('/api/contact', []);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['name', 'email', 'message']);
    }

    public function test_contact_form_accepts_valid_data(): void
    {
        Mail::fake();

        $response = $this->postJson('/api/contact', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'phone' => '0600000000',
            'subject' => 'Inquiry',
            'message' => 'Hello, I need information about solar panels.',
        ]);

        $response->assertStatus(201);

        $this->assertDatabaseHas('contact_messages', [
            'email' => 'test@example.com',
        ]);
    }
}
