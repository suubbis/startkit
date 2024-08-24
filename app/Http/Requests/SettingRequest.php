<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SettingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'date_format' => 'required|in:YYYY-MM-DD,DD-MM-YYYY,MM-DD-YYYY',
            'number_format' => 'required|in:##.##,##.###,##.####,##.#####',
            'time_format' => 'required|in:HH:MM:SS XM,HH:MM,HH:MM XM',
            'list_table_format' => 'required|in:Ascending,Descending',
            'id_format' => 'required|in:Regular ID,Custom ID',
            'default_currency' => 'required|string|max:3',
            'currency_name' => 'required|string|max:255',
            'currency_symbol' => 'required|string|max:10',
            'usage_format' => 'required|in:Currency Name,Currency Symbol',
            'backup_schedule' => 'required|in:Hourly,Daily,Weekly,Monthly,Yearly',
            'session_expiry' => 'required|in:5 minutes,10 minutes,30 minutes,1 hour,No expiry',
            'min_password_score' => 'required|in:Weak,Fair,Strong',
            'allow_consecutive_login_attempts' => 'required|integer|in:3,5,10',
            'allow_login_after_fail' => 'required|in:1 minute,5 minutes,10 minutes,30 minutes,1 hour,24 hours',
            'enable_two_factor_auth' => 'required|boolean',
        ];
    }
}
