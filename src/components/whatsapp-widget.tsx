
'use client';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Link from 'next/link';

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
        <path
        fill="currentColor"
        d="M12.04 2C6.58 2 2.13 6.45 2.13 12c0 1.8.48 3.55 1.38 5.06L2 22l5.2-1.52c1.46.84 3.15 1.31 4.84 1.31h.01c5.46 0 9.9-4.44 9.9-9.9c0-5.45-4.44-9.9-9.9-9.9zM12.04 20.15h-.01c-1.5 0-2.98-.4-4.29-1.15l-.3-.18l-3.18.93l.95-3.1l-.2-.31c-.83-1.3-1.28-2.83-1.28-4.43c0-4.54 3.7-8.24 8.24-8.24c4.54 0 8.24 3.7 8.24 8.24c0 4.54-3.7 8.24-8.23 8.24zM17.39 14.15c-.2-.11-.7-.35-1.18-.59c-.48-.24-.83-.42-1.07-.42c-.24 0-.48.11-.66.35c-.18.24-.7.83-.86 1c-.16.18-.3.2-.48.1c-.18-.11-1.13-.42-2.15-1.32c-.8-.7-1.34-1.58-1.52-1.85c-.18-.28-.01-.43.1-.57c.1-.11.24-.3.36-.45c.12-.15.16-.24.24-.42c.08-.18.04-.35-.02-.46c-.06-.11-.48-1.15-.66-1.6c-.17-.43-.35-.37-.48-.37c-.12 0-.27 0-.42 0c-.15 0-.39.06-.6.3c-.2.24-.82.8-1.01 1.95c-.2 1.15.24 2.54.36 2.73c.12.2 1.57 2.45 3.8 3.35c.54.22.95.35 1.27.45c.56.17 1.07.15 1.47.09c.45-.07 1.35-.55 1.54-1.07c.2-.52.2-1 .14-1.12c-.07-.1-.2-.17-.4-.28z"
        />
    </svg>
);


export default function WhatsAppWidget() {
    // Replace with the administrator's actual WhatsApp number
    const adminPhoneNumber = "+233541988383"; // Example number for Ghana
    const prefilledMessage = "Hello, I have a question about the platform.";

    const whatsappLink = `https://wa.me/${adminPhoneNumber}?text=${encodeURIComponent(prefilledMessage)}`;

    return null;
}
