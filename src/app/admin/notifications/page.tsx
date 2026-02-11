import { Card, CardContent } from '@/components/ui/card';

export default function AdminNotificationsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">Notifications</h1>
        <p className="text-muted-foreground">Manage platform notifications.</p>
      </div>
      <Card>
        <CardContent className="pt-6 text-center text-muted-foreground">
          Notifications management will be here.
        </CardContent>
      </Card>
    </div>
  );
}
