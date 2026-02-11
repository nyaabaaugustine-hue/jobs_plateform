import { Card, CardContent } from '@/components/ui/card';

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Detailed platform analytics.</p>
      </div>
      <Card>
        <CardContent className="pt-6 text-center text-muted-foreground">
          Analytics page content will be here.
        </CardContent>
      </Card>
    </div>
  );
}
