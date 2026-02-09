'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Search } from 'lucide-react';

export default function JobFilters() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="keyword">Keyword</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input id="keyword" placeholder="Job title, company..." className="pl-9" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input id="location" placeholder="City, state, zip code..." />
      </div>
      <div className="space-y-4">
        <Label>Job Type</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="full-time" />
            <Label htmlFor="full-time">Full-time</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="part-time" />
            <Label htmlFor="part-time">Part-time</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="contract" />
            <Label htmlFor="contract">Contract</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="remote" />
            <Label htmlFor="remote">Remote</Label>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <Label>Salary Range</Label>
        <Slider defaultValue={[50000]} max={200000} step={1000} />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>$50k</span>
          <span>$200k+</span>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="experience">Experience Level</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="All levels" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="entry">Entry-level</SelectItem>
            <SelectItem value="mid">Mid-level</SelectItem>
            <SelectItem value="senior">Senior-level</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="date-posted">Date Posted</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Any time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Last 24 hours</SelectItem>
            <SelectItem value="week">Last 7 days</SelectItem>
            <SelectItem value="month">Last 30 days</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button className="w-full">Apply Filters</Button>
    </div>
  );
}
