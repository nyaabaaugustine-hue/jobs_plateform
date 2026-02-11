import { Card, CardContent } from '@/components/ui/card';

export default function AdminFinancialsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">Financials</h1>
        <p className="text-muted-foreground">View financial data and reports.</p>
      </div>
      <Card>
        <CardContent className="pt-6 text-center text-muted-foreground">
          Financials page content will be here.
        </CardContent>
      </Card>
    </div>
  );
}
