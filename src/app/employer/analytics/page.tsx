import { Card, CardContent } from '@/components/ui/card';
import EmployerAnalytics from '@/components/employer-analytics';

export default function EmployerAnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">Hiring Analytics</h1>
        <p className="text-muted-foreground">Analyze your hiring funnel and job performance.</p>
      </div>
      <EmployerAnalytics />
    </div>
  );
}
