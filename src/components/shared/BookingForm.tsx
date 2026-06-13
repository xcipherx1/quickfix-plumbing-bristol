"use client";

import { useState } from "react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Phone, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const formSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().min(10, 'Valid phone number required'),
  email: z.string().email().optional().or(z.literal('')),
  serviceType: z.string().min(1, 'Please select a service'),
  postcode: z.string().min(3, 'Valid postcode required'),
  message: z.string().optional(),
  preferredDate: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const serviceOptions = [
  'Emergency Plumbing',
  'Residential Plumbing',
  'Commercial Plumbing',
  'Heating & Gas',
  'Drainage',
  'Other',
];

export function BookingForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    toast.success('Quote request submitted! We will call you within 30 minutes.');
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-bento hover:shadow-bento-hover transition-shadow">
      <h3 className="text-xl font-bold text-[#0F172A] mb-1">Get Your Free Quote</h3>
      <p className="text-sm text-[#0F172A]/60 mb-6">Fill in the form and we'll get back to you fast.</p>

      {submitted ? (
        <div className="flex flex-col items-center justify-center py-8">
          <CheckCircle className="w-12 h-12 text-[#10B981] mb-4" />
          <p className="text-lg font-semibold text-[#0F172A]">Thank you!</p>
          <p className="text-sm text-[#0F172A]/60">We'll call you within 30 minutes.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              placeholder="Your Name *"
              {...register('name')}
              className="border-[rgba(15,23,42,0.1)] focus:border-[#06B6D4] focus:ring-[#06B6D4]"
            />
            {errors.name && <p className="text-xs text-[#EF4444] mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <Input
              placeholder="Phone Number *"
              {...register('phone')}
              className="border-[rgba(15,23,42,0.1)] focus:border-[#06B6D4] focus:ring-[#06B6D4]"
            />
            {errors.phone && <p className="text-xs text-[#EF4444] mt-1">{errors.phone.message}</p>}
          </div>

          <div>
            <Input
              placeholder="Email (optional)"
              {...register('email')}
              className="border-[rgba(15,23,42,0.1)] focus:border-[#06B6D4] focus:ring-[#06B6D4]"
            />
          </div>

          <div>
            <select
              {...register('serviceType')}
              className="w-full h-10 px-3 rounded-md border border-[rgba(15,23,42,0.1)] bg-white text-sm focus:border-[#06B6D4] focus:ring-1 focus:ring-[#06B6D4] outline-none"
            >
              <option value="">Select Service Type *</option>
              {serviceOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            {errors.serviceType && <p className="text-xs text-[#EF4444] mt-1">{errors.serviceType.message}</p>}
          </div>

          <div>
            <Input
              placeholder="Postcode *"
              {...register('postcode')}
              className="border-[rgba(15,23,42,0.1)] focus:border-[#06B6D4] focus:ring-[#06B6D4]"
            />
            {errors.postcode && <p className="text-xs text-[#EF4444] mt-1">{errors.postcode.message}</p>}
          </div>

          <Textarea
            placeholder="Tell us about the problem (optional)"
            {...register('message')}
            rows={3}
            className="border-[rgba(15,23,42,0.1)] focus:border-[#06B6D4] focus:ring-[#06B6D4] resize-none"
          />

          <div>
            <Input
              type="datetime-local"
              {...register('preferredDate')}
              className="border-[rgba(15,23,42,0.1)] focus:border-[#06B6D4] focus:ring-[#06B6D4]"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-white font-semibold py-3 rounded-xl transition-all hover:scale-[1.02]"
          >
            <Send className="w-4 h-4 mr-2" />
            {isSubmitting ? 'Sending...' : 'Get Free Quote'}
          </Button>

          <div className="flex items-center justify-center gap-2 text-sm text-[#EF4444]">
            <Phone className="w-4 h-4" />
            <span>Or call emergency: <a href="tel:01172345678" className="font-semibold underline">0117 234 5678</a></span>
          </div>
        </form>
      )}
    </div>
  );
}
