import { Card, CardContent } from '@/components/ui/card';

export default function AdminSupportPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">Support</h1>
        <p className="text-muted-foreground">View and respond to support tickets.</p>
      </div>
      <Card>
        <CardContent className="pt-6 text-center text-muted-foreground">
          Support tickets will be displayed here.
        </CardContent>
      </Card>
    </div>
  );
}
