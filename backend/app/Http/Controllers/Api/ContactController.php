<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Models\ContactMessage;
use App\Mail\ContactMessageMail;
use Illuminate\Support\Facades\Mail;

use Illuminate\Http\Request;

class ContactController extends Controller
{
    /* ================= STORE MESSAGE ================= */

    public function store(Request $request)
    {
        $validated = $request->validate([

            'name' => 'required|string|max:255',

            'email' => 'required|email|max:255',

            'phone' => 'nullable|string|max:255',

            'subject' => 'nullable|string|max:255',

            'message' => 'required|string|max:5000',
        ]);

        /*
    |---------------------------------------------
    | Save Message In Database (Optional)
    |---------------------------------------------
    */

        ContactMessage::create($validated);

        /*
    |---------------------------------------------
    | Send Email
    |---------------------------------------------
    */

        Mail::to('omarzguit0@gmail.com')
            ->send(new ContactMessageMail($validated));

        return response()->json([
            'message' => __('messages.contact_sent'),
        ], 201);
    }

    /* ================= ADMIN MESSAGES ================= */

    public function index()
    {
        $messages = ContactMessage::latest()->get();

        return response()->json($messages);
    }

    /* ================= SHOW MESSAGE ================= */

    public function show(ContactMessage $contactMessage)
    {
        $contactMessage->update([
            'is_read' => true,
        ]);

        return response()->json($contactMessage);
    }

    /* ================= DELETE MESSAGE ================= */

    public function destroy(ContactMessage $contactMessage)
    {
        $contactMessage->delete();

        return response()->json([
            'message' => __('messages.contact_deleted'),
        ]);
    }
}
