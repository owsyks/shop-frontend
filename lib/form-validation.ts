"use client"

import { useState, useEffect } from "react"

export interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  email?: boolean
  phone?: boolean
  custom?: (value: string) => string | null
}

export interface ValidationErrors {
  [key: string]: string
}

export function useFormValidation<T extends Record<string, any>>(
  initialValues: T,
  validationRules: Partial<Record<keyof T, ValidationRule>>
) {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({})

  const validateField = (name: keyof T, value: string): string | null => {
    const rule = validationRules[name]
    if (!rule) return null

    if (rule.required && (!value || value.trim() === '')) {
      return `${String(name)} is required`
    }

    if (value && rule.minLength && value.length < rule.minLength) {
      return `${String(name)} must be at least ${rule.minLength} characters`
    }

    if (value && rule.maxLength && value.length > rule.maxLength) {
      return `${String(name)} must be no more than ${rule.maxLength} characters`
    }

    if (value && rule.pattern && !rule.pattern.test(value)) {
      return `${String(name)} format is invalid`
    }

    if (value && rule.email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailPattern.test(value)) {
        return 'Please enter a valid email address'
      }
    }

    if (value && rule.phone) {
      const phonePattern = /^[\+]?[0-9\s\-\(\)]{10,}$/
      if (!phonePattern.test(value)) {
        return 'Please enter a valid phone number'
      }
    }

    if (value && rule.custom) {
      return rule.custom(value)
    }

    return null
  }

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {}
    let isValid = true

    Object.keys(validationRules).forEach((key) => {
      const error = validateField(key as keyof T, values[key as keyof T])
      if (error) {
        newErrors[key] = error
        isValid = false
      }
    })

    setErrors(newErrors)
    return isValid
  }

  const handleChange = (name: keyof T, value: string) => {
    setValues(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name as string]) {
      setErrors(prev => ({ ...prev, [name as string]: '' }))
    }
  }

  const handleBlur = (name: keyof T) => {
    setTouched(prev => ({ ...prev, [name]: true }))
    
    const error = validateField(name, values[name as keyof T])
    if (error) {
      setErrors(prev => ({ ...prev, [name as string]: error }))
    }
  }

  const reset = () => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
  }

  const getFieldError = (name: keyof T): string => {
    return touched[name] ? errors[name as string] || '' : ''
  }

  const hasErrors = Object.keys(errors).some(key => errors[key])

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    reset,
    getFieldError,
    hasErrors,
    isValid: !hasErrors && Object.keys(touched).length > 0
  }
}

// Common validation rules
export const validationRules = {
  email: {
    required: true,
    email: true
  },
  password: {
    required: true,
    minLength: 8
  },
  phone: {
    required: true,
    phone: true
  },
  name: {
    required: true,
    minLength: 2,
    maxLength: 50
  },
  address: {
    required: true,
    minLength: 10,
    maxLength: 200
  }
}
