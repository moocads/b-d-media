'use client';

import { useState, FormEvent } from 'react';
import { strapi } from '@/lib/strapi';

interface ContactFormProps {
  translations: {
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    submit: string;
    successMessage: string;
    errorMessage: string;
  };
}

export default function ContactForm({ translations }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus('error');
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Assuming there's a 'contact-submissions' collection in Strapi
      await strapi.create('contacts', {
        name: formData.name,
        email: formData.email,
        message: formData.message
      });

      // Reset form on success
      setFormData({
        name: '',
        email: '',
        message: '',
      });

      setSubmitStatus('success');
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitStatus('error');
      setErrorMessage('An error occurred while submitting your message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {submitStatus === 'success' && (
        <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-md mb-4">
          {translations.successMessage}
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md mb-4">
          {errorMessage || translations.errorMessage}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block mb-1">{translations.name}</label>
        <input
          type="text"
          id="name"
          className="w-full p-2 border rounded-md"
          placeholder={translations.namePlaceholder}
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="block mb-1">{translations.email}</label>
        <input
          type="email"
          id="email"
          className="w-full p-2 border rounded-md"
          placeholder={translations.emailPlaceholder}
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="message" className="block mb-1">{translations.message}</label>
        <textarea
          id="message"
          rows={4}
          className="w-full p-2 border rounded-md"
          placeholder={translations.messagePlaceholder}
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
      </div>

      <button
        type="submit" className="bg-black rounded-full px-4 py-2 text-white text-sm mt-2" disabled={isSubmitting} >
        {isSubmitting ? 'Sending...' : translations.submit}
      </button>
    </form>
  );
}
