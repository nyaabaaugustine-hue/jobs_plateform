'use client';

import { useState, useEffect } from 'react';
import { DUMMY_APPLICANTS } from '@/lib/data';
import { Skeleton } from '@/components/ui/skeleton';

export default function CompanyHires({ companyJobIds }: { companyJobIds: string[] }) {
    const [companyHires, setCompanyHires] = useState<number | null>(null);

    useEffect(() => {
        const count = DUMMY_APPLICANTS.filter(applicant => 
            applicant.status === 'Hired' && companyJobIds.includes(applicant.jobId)
        ).length;
        setCompanyHires(count);
    }, [companyJobIds]);

    if (companyHires === null) {
        return (
             <div className="flex justify-between">
                <span className="text-muted-foreground">Hired with us</span>
                <Skeleton className="h-4 w-16" />
            </div>
        )
    }

    return (
        <div className="flex justify-between">
            <span className="text-muted-foreground">Hired with us</span>
            <span className="font-medium">{companyHires} {companyHires === 1 ? 'candidate' : 'candidates'}</span>
        </div>
    );
}
