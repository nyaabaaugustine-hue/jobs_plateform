import { Card, CardContent } from '@/components/ui/card';

export default function EmployerMessagesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">Messages</h1>
        <p className="text-muted-foreground">Communicate with applicants and your team.</p>
      </div>
      <Card>
        <CardContent className="pt-6 text-center text-muted-foreground">
          Messaging functionality will be available here.
        </CardContent>
      </Card>
    </div>
  );
}
