import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { format } from "date-fns";

function TestCalendarPage() {
  const [date, setDate] = useState<string>("2022-01-01");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calendar</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-start gap-2">
        <Calendar
          mode="single"
          selected={date ? new Date(date) : new Date()}
          onSelect={(date) => date && setDate(format(date, "yyyy-MM-dd"))}
        />

        <Calendar mode="range" />
      </CardContent>
    </Card>
  );
}

export default TestCalendarPage;
