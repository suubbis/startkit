<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
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
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $this->route('user'),
            'phone_number' => 'required|string|max:15',
            'address' => 'required|string',
            'date_of_birth' => 'nullable|date',
            'supervisor_id' => 'nullable|exists:users,id',
            'role_id' => 'required|exists:roles,id',
            'view_journal_entry_info' => 'boolean',
            'username' => 'required|string|max:255|unique:users,'. $this->route('user'),
            'password' => 'required|string|min:8',
        ];
    }
}
