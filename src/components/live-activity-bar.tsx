import { Award, Briefcase, Building, CheckCircle } from 'lucide-react';

const activityItems = [
  { icon: Briefcase, metric: '12,430', label: 'Jobs Available' },
  { icon: Building, metric: '4,500', label: 'Companies Hiring' },
  { icon: CheckCircle, metric: '98%', label: 'Candidate Satisfaction' },
  { icon: Award, metric: '320', label: 'Hires This Week' },
];

export default function LiveActivityBar() {
  return (
    <div className="sticky top-[80px] z-40 w-full overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-blue-600 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-purple-700 to-transparent" />

      <div className="flex animate-marquee-rtl whitespace-nowrap">
        {/* Render items twice for seamless loop */}
        {[...activityItems, ...activityItems].map((item, index) => (
          <div key={index} className="flex shrink-0 items-center gap-4 py-4 px-10 text-white">
            <div className="rounded-xl bg-white/10 p-2">
              <item.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xl font-bold">{item.metric}</p>
              <p className="text-sm opacity-80">{item.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
