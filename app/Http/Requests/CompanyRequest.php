<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CompanyRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'abbreviation' => 'required|string|max:10',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'address' => 'required|string|max:255',
            'manager_id' => 'required|exists:users,id',
            'phone' => 'required|string|unique:company_details,phone,' . $this->route('company_detail').'|regex:/^([0-9\s\-\+\(\)]*)$/',
            'email' => 'required|email|max:255|unique:company_details,email,' . $this->route('company_detail'),
            'website' => 'nullable|url|max:255',
        ];
    }
}
