<?php

namespace App\Notifications;

use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\App;

class CustomResetPasswordNotification extends Notification
{
    public $token;
    public $locale;

    public function __construct($token, $locale)
    {
        $this->token = $token;
        $this->locale = $locale;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        App::setLocale($this->locale);

        $url = env('FRONTEND_URL')
            . '/reset-password/'
            . $this->token
            . '?email='
            . $notifiable->email;

        return (new MailMessage)
            ->subject(__('passwords.subject'))
            ->greeting(__('passwords.greeting') . ' ' . $notifiable->name . ' 👋')
            ->line(__('passwords.message'))
            ->action(__('passwords.button'), $url)
            ->line(__('passwords.expire'))
            ->line(__('passwords.ignore'))
            ->salutation(__('passwords.salutation'));
    }
}